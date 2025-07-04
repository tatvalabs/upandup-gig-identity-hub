
import { useState } from "react";
import { Building2, Users, FileText, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PartnerData {
  name: string;
  email: string;
  phone: string;
  address: string;
  registrationNumber: string;
  contactPerson: string;
  businessType: string;
  expectedWorkers: string;
}

const PartnerOnboarding = () => {
  const [step, setStep] = useState(1);
  const [partnerData, setPartnerData] = useState<PartnerData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    registrationNumber: "",
    contactPerson: "",
    businessType: "",
    expectedWorkers: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof PartnerData, value: string) => {
    setPartnerData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('partners')
        .insert({
          name: partnerData.name,
          email: partnerData.email,
          phone: partnerData.phone,
          address: partnerData.address,
          registration_number: partnerData.registrationNumber,
          partnership_status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      // Create partnership agreement
      await supabase
        .from('partnership_agreements')
        .insert({
          partner_id: data.id,
          agreement_type: 'Standard Partnership',
          terms: {
            businessType: partnerData.businessType,
            expectedWorkers: partnerData.expectedWorkers,
            contactPerson: partnerData.contactPerson
          },
          status: 'draft'
        });

      toast({
        title: "Partnership Application Submitted!",
        description: "Your application is being reviewed. You'll receive confirmation within 24 hours.",
      });
      setStep(4);
    } catch (error) {
      console.error('Error submitting partnership:', error);
      toast({
        title: "Error",
        description: "Failed to submit partnership application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Enter company name"
                  value={partnerData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Business Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="company@example.com"
                  value={partnerData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+91-XXXXXXXXXX"
                  value={partnerData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registration">Registration Number</Label>
                <Input
                  id="registration"
                  placeholder="Company registration number"
                  value={partnerData.registrationNumber}
                  onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Business Address</Label>
              <Textarea
                id="address"
                placeholder="Enter complete business address"
                value={partnerData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Business Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Primary Contact Person</Label>
                <Input
                  id="contactPerson"
                  placeholder="Contact person name"
                  value={partnerData.contactPerson}
                  onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <Input
                  id="businessType"
                  placeholder="e.g., Security Services, Logistics"
                  value={partnerData.businessType}
                  onChange={(e) => handleInputChange("businessType", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expectedWorkers">Expected Number of Workers</Label>
                <Input
                  id="expectedWorkers"
                  placeholder="Approximate number"
                  value={partnerData.expectedWorkers}
                  onChange={(e) => handleInputChange("expectedWorkers", e.target.value)}
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review Partnership Details</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>Company:</strong> {partnerData.name}</p>
                  <p><strong>Email:</strong> {partnerData.email}</p>
                  <p><strong>Phone:</strong> {partnerData.phone}</p>
                  <p><strong>Registration:</strong> {partnerData.registrationNumber}</p>
                </div>
                <div>
                  <p><strong>Contact Person:</strong> {partnerData.contactPerson}</p>
                  <p><strong>Business Type:</strong> {partnerData.businessType}</p>
                  <p><strong>Expected Workers:</strong> {partnerData.expectedWorkers}</p>
                </div>
              </div>
              <div>
                <p><strong>Address:</strong> {partnerData.address}</p>
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">What happens next?</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Your application will be reviewed within 24 hours</li>
                <li>• You'll receive a CORD issuance node for your organization</li>
                <li>• Access to the partner dashboard for worker management</li>
                <li>• Ability to issue achievement certificates to workers</li>
                <li>• Integration with UpandUp's trust scoring system</li>
              </ul>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
            <h3 className="text-xl font-semibold text-green-600">Partnership Application Submitted!</h3>
            <p className="text-gray-600">
              Thank you for partnering with UpandUp. Our team will review your application and 
              contact you within 24 hours with next steps.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                Once approved, you'll receive:
              </p>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li>• Partner dashboard access credentials</li>
                <li>• CORD blockchain node setup</li>
                <li>• Worker onboarding tools</li>
                <li>• Certificate issuance capabilities</li>
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Building2 className="h-6 w-6 text-primary" />
          <span>Partner Onboarding</span>
        </CardTitle>
        <div className="flex items-center space-x-2 mt-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                i <= step ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              {i}
            </div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderStep()}
        
        {step < 4 && (
          <div className="flex justify-between">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            )}
            <Button 
              onClick={step === 3 ? handleSubmit : handleNext}
              className="ml-auto"
              disabled={loading}
            >
              {loading ? "Submitting..." : step === 3 ? "Submit Application" : "Next"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PartnerOnboarding;
