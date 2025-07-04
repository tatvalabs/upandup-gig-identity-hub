
import { useState, useEffect } from "react";
import { Award, Plus, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { createCORDService } from "@/services/cordService";

interface Worker {
  id: string;
  name: string;
  phone: string;
}

interface CertificateIssuanceProps {
  partnerId: string;
}

const CertificateIssuance = ({ partnerId }: CertificateIssuanceProps) => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [certificateData, setCertificateData] = useState({
    workerId: "",
    certificateType: "",
    title: "",
    description: "",
    expiresAt: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchWorkers();
  }, [partnerId]);

  const fetchWorkers = async () => {
    try {
      const { data, error } = await supabase
        .from('workers')
        .select('id, name, phone')
        .eq('partner_id', partnerId)
        .eq('onboarding_status', 'active');

      if (error) throw error;
      setWorkers(data || []);
    } catch (error) {
      console.error('Error fetching workers:', error);
    }
  };

  const handleIssueCertificate = async () => {
    if (!certificateData.workerId || !certificateData.certificateType || !certificateData.title) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Create certificate record in database
      const { data: certificate, error: dbError } = await supabase
        .from('employer_certifications')
        .insert({
          partner_id: partnerId,
          worker_id: certificateData.workerId,
          certificate_type: certificateData.certificateType,
          title: certificateData.title,
          description: certificateData.description,
          expires_at: certificateData.expiresAt || null,
          metadata: {
            issued_by: 'partner',
            issue_date: new Date().toISOString()
          }
        })
        .select()
        .single();

      if (dbError) throw dbError;

      // Issue VC using CORD service
      const cordService = createCORDService();
      const vcResponse = await cordService.issueVC({
        workerId: certificateData.workerId,
        documentUrl: `certificate://${certificate.id}`,
        credentialType: 'employer-appreciation',
        issuer: `partner:${partnerId}`,
        metadata: {
          issueDate: new Date().toISOString(),
          expiryDate: certificateData.expiresAt,
          documentHash: `cert_${certificate.id}`,
          additionalData: {
            certificateType: certificateData.certificateType,
            title: certificateData.title,
            description: certificateData.description
          }
        }
      });

      // Update certificate with VC URL
      await supabase
        .from('employer_certifications')
        .update({ vc_url: vcResponse.vcUrl })
        .eq('id', certificate.id);

      toast({
        title: "Certificate Issued!",
        description: `${certificateData.title} has been issued as a verifiable credential.`
      });

      // Reset form
      setCertificateData({
        workerId: "",
        certificateType: "",
        title: "",
        description: "",
        expiresAt: ""
      });

    } catch (error) {
      console.error('Error issuing certificate:', error);
      toast({
        title: "Error",
        description: "Failed to issue certificate. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-6 w-6 text-primary" />
            <span>Issue Achievement Certificate</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="worker">Select Worker *</Label>
              <Select value={certificateData.workerId} onValueChange={(value) => 
                setCertificateData(prev => ({ ...prev, workerId: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Choose worker" />
                </SelectTrigger>
                <SelectContent>
                  {workers.map((worker) => (
                    <SelectItem key={worker.id} value={worker.id}>
                      {worker.name} - {worker.phone}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="certificateType">Certificate Type *</Label>
              <Select value={certificateData.certificateType} onValueChange={(value) => 
                setCertificateData(prev => ({ ...prev, certificateType: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="skill">Skill Certificate</SelectItem>
                  <SelectItem value="achievement">Achievement Award</SelectItem>
                  <SelectItem value="training">Training Completion</SelectItem>
                  <SelectItem value="performance">Performance Excellence</SelectItem>
                  <SelectItem value="safety">Safety Compliance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Certificate Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Excellence in Security Services"
                value={certificateData.title}
                onChange={(e) => setCertificateData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the achievement or skill being certified"
                value={certificateData.description}
                onChange={(e) => setCertificateData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiresAt">Expiry Date (Optional)</Label>
              <Input
                id="expiresAt"
                type="date"
                value={certificateData.expiresAt}
                onChange={(e) => setCertificateData(prev => ({ ...prev, expiresAt: e.target.value }))}
              />
            </div>
          </div>

          <Button onClick={handleIssueCertificate} disabled={loading} className="w-full">
            <Send className="h-4 w-4 mr-2" />
            {loading ? "Issuing Certificate..." : "Issue Certificate"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Certificate Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-gray-600">
            <p>• <strong>Blockchain Verified:</strong> Certificates are issued as Verifiable Credentials on CORD blockchain</p>
            <p>• <strong>Trust Score Boost:</strong> Verified certificates increase worker's trust score</p>
            <p>• <strong>Portable Credentials:</strong> Workers can share certificates across platforms</p>
            <p>• <strong>Tamper Proof:</strong> Cannot be forged or altered once issued</p>
            <p>• <strong>Instant Verification:</strong> Anyone can verify certificate authenticity</p>
            <p>• <strong>Worker Motivation:</strong> Recognition drives better performance</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CertificateIssuance;
