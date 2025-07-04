
import { useState, useEffect } from "react";
import { User, Phone, Mail, Calendar, Badge as BadgeIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

interface Worker {
  id: string;
  name: string;
  phone: string;
  email?: string;
  did?: string;
  onboarding_status: string;
  mobile_app_registered: boolean;
  created_at: string;
  trust_scores?: {
    score: number;
    verified_credentials: number;
    total_credentials: number;
  }[];
}

interface WorkerListProps {
  partnerId: string;
  onStatsUpdate: () => void;
}

const WorkerList = ({ partnerId }: WorkerListProps) => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchWorkers();
  }, [partnerId]);

  const fetchWorkers = async () => {
    try {
      const { data, error } = await supabase
        .from('workers')
        .select(`
          id,
          name,
          phone,
          email,
          did,
          onboarding_status,
          mobile_app_registered,
          created_at,
          trust_scores (
            score,
            verified_credentials,
            total_credentials
          )
        `)
        .eq('partner_id', partnerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWorkers(data || []);
    } catch (error) {
      console.error('Error fetching workers:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'verified': return 'bg-blue-100 text-blue-800';
      case 'registered': return 'bg-yellow-100 text-yellow-800';
      case 'invited': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredWorkers = workers.filter(worker =>
    worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    worker.phone.includes(searchTerm)
  );

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading workers...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Worker Management</CardTitle>
            <div className="flex space-x-2">
              <Input
                placeholder="Search workers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWorkers.map((worker) => {
              const trustScore = worker.trust_scores?.[0];
              return (
                <Card key={worker.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-2">
                          <User className="h-5 w-5 text-gray-600" />
                          <h3 className="font-semibold">{worker.name}</h3>
                        </div>
                        <Badge className={getStatusColor(worker.onboarding_status)} variant="secondary">
                          {worker.onboarding_status}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4" />
                          <span>{worker.phone}</span>
                        </div>
                        {worker.email && (
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4" />
                            <span>{worker.email}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Joined {new Date(worker.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {worker.did && (
                        <div className="bg-blue-50 p-2 rounded text-xs">
                          <span className="font-medium">DID:</span> {worker.did.substring(0, 20)}...
                        </div>
                      )}

                      {trustScore && (
                        <div className="flex justify-between items-center bg-green-50 p-2 rounded">
                          <div className="flex items-center space-x-1">
                            <BadgeIcon className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium">Trust Score</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">{trustScore.score}/100</div>
                            <div className="text-xs text-gray-600">
                              {trustScore.verified_credentials}/{trustScore.total_credentials} verified
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Mobile App: {worker.mobile_app_registered ? 'Registered' : 'Pending'}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredWorkers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? 'No workers match your search.' : 'No workers found. Start by inviting workers to join your team.'}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkerList;
