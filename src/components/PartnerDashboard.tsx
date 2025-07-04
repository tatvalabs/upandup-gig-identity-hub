
import { useState, useEffect } from "react";
import { Users, Plus, Award, BarChart3, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import WorkerInvitation from "./WorkerInvitation";
import CertificateIssuance from "./CertificateIssuance";
import WorkerList from "./WorkerList";

interface PartnerInfo {
  id: string;
  name: string;
  email: string;
  partnership_status: string;
  cord_node_id?: string;
  onboarding_completed: boolean;
}

interface WorkerStats {
  total: number;
  active: number;
  pending: number;
  verified: number;
}

const PartnerDashboard = () => {
  const [partnerInfo, setPartnerInfo] = useState<PartnerInfo | null>(null);
  const [workerStats, setWorkerStats] = useState<WorkerStats>({
    total: 0,
    active: 0,
    pending: 0,
    verified: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartnerInfo();
    fetchWorkerStats();
  }, []);

  const fetchPartnerInfo = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('partner_users')
        .select(`
          partner_id,
          partners (
            id,
            name,
            email,
            partnership_status,
            cord_node_id,
            onboarding_completed
          )
        `)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      if (data?.partners) {
        setPartnerInfo(data.partners as PartnerInfo);
      }
    } catch (error) {
      console.error('Error fetching partner info:', error);
    }
  };

  const fetchWorkerStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get partner_id first
      const { data: partnerUser } = await supabase
        .from('partner_users')
        .select('partner_id')
        .eq('user_id', user.id)
        .single();

      if (!partnerUser) return;

      const { data: workers, error } = await supabase
        .from('workers')
        .select('onboarding_status')
        .eq('partner_id', partnerUser.partner_id);

      if (error) throw error;

      const stats = workers?.reduce((acc, worker) => {
        acc.total++;
        switch (worker.onboarding_status) {
          case 'active':
            acc.active++;
            break;
          case 'verified':
            acc.verified++;
            break;
          default:
            acc.pending++;
        }
        return acc;
      }, { total: 0, active: 0, pending: 0, verified: 0 }) || { total: 0, active: 0, pending: 0, verified: 0 };

      setWorkerStats(stats);
    } catch (error) {
      console.error('Error fetching worker stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!partnerInfo) {
    return <div className="text-center text-gray-600">Partner information not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{partnerInfo.name}</h1>
          <p className="text-gray-600">Partner Dashboard</p>
        </div>
        <Badge 
          variant={partnerInfo.partnership_status === 'active' ? 'default' : 'secondary'}
          className="text-sm"
        >
          {partnerInfo.partnership_status.toUpperCase()}
        </Badge>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{workerStats.total}</p>
                <p className="text-sm text-gray-600">Total Workers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{workerStats.active}</p>
                <p className="text-sm text-gray-600">Active Workers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Award className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{workerStats.verified}</p>
                <p className="text-sm text-gray-600">Verified Workers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{workerStats.pending}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="workers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="workers">Workers</TabsTrigger>
          <TabsTrigger value="invite">Invite Workers</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="workers" className="space-y-6">
          <WorkerList partnerId={partnerInfo.id} onStatsUpdate={fetchWorkerStats} />
        </TabsContent>

        <TabsContent value="invite" className="space-y-6">
          <WorkerInvitation partnerId={partnerInfo.id} onWorkerInvited={fetchWorkerStats} />
        </TabsContent>

        <TabsContent value="certificates" className="space-y-6">
          <CertificateIssuance partnerId={partnerInfo.id} />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Worker Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                Analytics dashboard coming soon...
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PartnerDashboard;
