
import { useState } from "react";
import { UserPlus, Send, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface WorkerInvitationProps {
  partnerId: string;
  onWorkerInvited: () => void;
}

const WorkerInvitation = ({ partnerId, onWorkerInvited }: WorkerInvitationProps) => {
  const [inviteMode, setInviteMode] = useState<'single' | 'bulk'>('single');
  const [workerData, setWorkerData] = useState({
    name: "",
    phone: "",
    email: ""
  });
  const [bulkData, setBulkData] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSingleInvite = async () => {
    if (!workerData.name || !workerData.phone) {
      toast({
        title: "Error",
        description: "Name and phone number are required",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('workers')
        .insert({
          partner_id: partnerId,
          name: workerData.name,
          phone: workerData.phone,
          email: workerData.email || null,
          onboarding_status: 'invited'
        });

      if (error) throw error;

      toast({
        title: "Worker Invited!",
        description: `${workerData.name} has been invited to join the platform.`
      });

      setWorkerData({ name: "", phone: "", email: "" });
      onWorkerInvited();
    } catch (error) {
      console.error('Error inviting worker:', error);
      toast({
        title: "Error",
        description: "Failed to invite worker. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBulkInvite = async () => {
    if (!bulkData.trim()) {
      toast({
        title: "Error",
        description: "Please enter worker data",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const lines = bulkData.trim().split('\n');
      const workers = lines.map(line => {
        const [name, phone, email] = line.split(',').map(item => item.trim());
        return {
          partner_id: partnerId,
          name,
          phone,
          email: email || null,
          onboarding_status: 'invited' as const
        };
      }).filter(worker => worker.name && worker.phone);

      if (workers.length === 0) {
        throw new Error('No valid worker data found');
      }

      const { error } = await supabase
        .from('workers')
        .insert(workers);

      if (error) throw error;

      toast({
        title: "Workers Invited!",
        description: `${workers.length} workers have been invited to join the platform.`
      });

      setBulkData("");
      onWorkerInvited();
    } catch (error) {
      console.error('Error bulk inviting workers:', error);
      toast({
        title: "Error",
        description: "Failed to invite workers. Please check the format and try again.",
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
            <UserPlus className="h-6 w-6 text-primary" />
            <span>Invite Workers</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              variant={inviteMode === 'single' ? 'default' : 'outline'}
              onClick={() => setInviteMode('single')}
              size="sm"
            >
              Single Invite
            </Button>
            <Button
              variant={inviteMode === 'bulk' ? 'default' : 'outline'}
              onClick={() => setInviteMode('bulk')}
              size="sm"
            >
              Bulk Invite
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {inviteMode === 'single' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="workerName">Worker Name *</Label>
                  <Input
                    id="workerName"
                    placeholder="Enter worker name"
                    value={workerData.name}
                    onChange={(e) => setWorkerData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="workerPhone">Phone Number *</Label>
                  <Input
                    id="workerPhone"
                    placeholder="+91-XXXXXXXXXX"
                    value={workerData.phone}
                    onChange={(e) => setWorkerData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="workerEmail">Email (Optional)</Label>
                  <Input
                    id="workerEmail"
                    type="email"
                    placeholder="worker@example.com"
                    value={workerData.email}
                    onChange={(e) => setWorkerData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>
              <Button onClick={handleSingleInvite} disabled={loading} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                {loading ? "Sending Invite..." : "Send Invitation"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bulkData">Worker Data</Label>
                <Textarea
                  id="bulkData"
                  placeholder="Enter worker data in CSV format:&#10;Name, Phone, Email&#10;John Doe, +91-9876543210, john@example.com&#10;Jane Smith, +91-8765432109"
                  rows={8}
                  value={bulkData}
                  onChange={(e) => setBulkData(e.target.value)}
                />
                <p className="text-sm text-gray-600">
                  Format: Name, Phone, Email (one per line). Email is optional.
                </p>
              </div>
              <Button onClick={handleBulkInvite} disabled={loading} className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                {loading ? "Processing..." : "Bulk Invite Workers"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What happens after invitation?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-gray-600">
            <p>1. <strong>SMS Notification:</strong> Workers receive an SMS with download link for UpandUp mobile app</p>
            <p>2. <strong>App Registration:</strong> Workers register using their phone number and create their profile</p>
            <p>3. <strong>DID Creation:</strong> A unique Digital Identity (DID) is created on CORD blockchain</p>
            <p>4. <strong>Document Upload:</strong> Workers can upload government documents for verification</p>
            <p>5. <strong>DigiLocker Integration:</strong> Additional verification through DigiLocker for enhanced trust</p>
            <p>6. <strong>Trust Score:</strong> Workers receive a trust score based on verified credentials</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkerInvitation;
