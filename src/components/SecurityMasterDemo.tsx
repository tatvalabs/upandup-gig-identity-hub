// SecurityMaster Integration Demo Component
// Comprehensive example of partner onboarding and worker management

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Building2, 
  Users, 
  Award,
  Shield,
  FileText,
  Smartphone,
  Database,
  Network
} from "lucide-react";
import { useDIDCreation, useVCIssuance, useTrustScore, useDhiwayVerification } from "@/hooks/useDhiway";

interface SecurityMasterWorker {
  id: string;
  name: string;
  phone: string;
  employeeId: string;
  did?: string;
  status: 'invited' | 'registered' | 'verified' | 'active';
  trustScore?: number;
  credentials: string[];
}

const SecurityMasterDemo = () => {
  const [partnerDID, setPartnerDID] = useState<string | null>(null);
  const [workers, setWorkers] = useState<SecurityMasterWorker[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null);
  const [batchProcessing, setBatchProcessing] = useState(false);
  
  const { createDID, isLoading: didLoading } = useDIDCreation();
  const { issueVC, isLoading: vcLoading } = useVCIssuance();
  const { calculateTrustScore, isLoading: trustLoading } = useTrustScore();
  const { verifyDID, verifyVC, verifyWithDigiLocker, createWallet, isLoading: verifyLoading } = useDhiwayVerification();

  // Step 1: SecurityMaster Partner Registration
  const handlePartnerRegistration = async () => {
    const response = await createDID({
      workerDetails: {
        name: "SecurityMaster Services Pvt Ltd",
        address: "Corporate Office, Cyber City, Gurgaon, Haryana",
        phone: "+91-124-4567890",
        aadhar: "PARTNER-ENTITY",
        employer: "Self (Security Service Provider)"
      }
    });

    if (response) {
      setPartnerDID(response.did);
    }
  };

  // Step 2: Batch Worker Onboarding
  const handleBatchWorkerOnboarding = async () => {
    setBatchProcessing(true);
    
    const securityMasterWorkers = [
      { name: "Rajesh Kumar", phone: "+91-9876543210", employeeId: "SM001" },
      { name: "Priya Sharma", phone: "+91-9876543211", employeeId: "SM002" },
      { name: "Amit Singh", phone: "+91-9876543212", employeeId: "SM003" },
      { name: "Sunita Devi", phone: "+91-9876543213", employeeId: "SM004" },
      { name: "Vikram Yadav", phone: "+91-9876543214", employeeId: "SM005" }
    ];

    const newWorkers: SecurityMasterWorker[] = [];

    for (const worker of securityMasterWorkers) {
      try {
        const didResponse = await createDID({
          workerDetails: {
            name: worker.name,
            address: "SecurityMaster Employee",
            phone: worker.phone,
            aadhar: "pending-verification",
            employer: "SecurityMaster Services Pvt Ltd"
          }
        });

        if (didResponse) {
          newWorkers.push({
            id: worker.employeeId,
            name: worker.name,
            phone: worker.phone,
            employeeId: worker.employeeId,
            did: didResponse.did,
            status: 'registered',
            credentials: []
          });
        }
      } catch (error) {
        console.error(`Failed to create DID for ${worker.name}:`, error);
      }
    }

    setWorkers(newWorkers);
    setBatchProcessing(false);
  };

  // Step 3: Document Verification & VC Issuance
  const handleDocumentVerification = async (workerId: string) => {
    const worker = workers.find(w => w.id === workerId);
    if (!worker || !worker.did) return;

    // Simulate DigiLocker verification
    const digiLockerResult = await verifyWithDigiLocker("voter-id", "xxxx-xxxx-1234");
    
    if (digiLockerResult) {
      // Issue VC for verified document
      const vcResponse = await issueVC({
        workerId: worker.did,
        documentUrl: "https://digilocker.gov.in/documents/voter-id-123",
        credentialType: "voter-id",
        issuer: "Election Commission of India",
        metadata: {
          issueDate: new Date().toISOString(),
          documentHash: "sha256:voter_id_hash_123",
          additionalData: {
            verifiedBy: "DigiLocker",
            verificationDate: new Date().toISOString()
          }
        }
      });

      if (vcResponse) {
        setWorkers(prev => prev.map(w => 
          w.id === workerId 
            ? { ...w, status: 'verified', credentials: [...w.credentials, 'voter-id'] }
            : w
        ));
      }
    }
  };

  // Step 4: Issue SecurityMaster Achievement Certificate
  const handleIssueCertificate = async (workerId: string) => {
    const worker = workers.find(w => w.id === workerId);
    if (!worker || !worker.did) return;

    const certificateResponse = await issueVC({
      workerId: worker.did,
      documentUrl: `https://securitymaster.com/certificates/${workerId}`,
      credentialType: "employer-appreciation",
      issuer: "SecurityMaster Services Pvt Ltd",
      metadata: {
        issueDate: new Date().toISOString(),
        documentHash: `sm_cert_${workerId}`,
        additionalData: {
          certificateType: "Excellence in Security Services",
          title: "Outstanding Performance Award",
          validationCode: `SM${Date.now()}`
        }
      }
    });

    if (certificateResponse) {
      setWorkers(prev => prev.map(w => 
        w.id === workerId 
          ? { ...w, credentials: [...w.credentials, 'achievement-certificate'] }
          : w
      ));
    }
  };

  // Step 5: Calculate Trust Score
  const handleCalculateTrustScore = async (workerId: string) => {
    const worker = workers.find(w => w.id === workerId);
    if (!worker || !worker.did) return;

    const trustResponse = await calculateTrustScore(worker.did);
    if (trustResponse) {
      setWorkers(prev => prev.map(w => 
        w.id === workerId 
          ? { ...w, trustScore: trustResponse.score, status: 'active' }
          : w
      ));
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span>SecurityMaster Integration Demo</span>
          </CardTitle>
          <p className="text-gray-600">
            Complete end-to-end demonstration of SecurityMaster's integration with UpandUp platform
            using Dhiway sandbox environment.
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="partner">Partner Setup</TabsTrigger>
              <TabsTrigger value="workers">Worker Onboarding</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="text-2xl font-bold">1</p>
                        <p className="text-sm text-gray-600">Partner</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="text-2xl font-bold">{workers.length}</p>
                        <p className="text-sm text-gray-600">Workers</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-8 w-8 text-purple-600" />
                      <div>
                        <p className="text-2xl font-bold">{workers.filter(w => w.status === 'verified').length}</p>
                        <p className="text-sm text-gray-600">Verified</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <Award className="h-8 w-8 text-orange-600" />
                      <div>
                        <p className="text-2xl font-bold">{workers.reduce((acc, w) => acc + w.credentials.length, 0)}</p>
                        <p className="text-sm text-gray-600">Credentials</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>SecurityMaster Integration Flow</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold">Phase 1: Partner Onboarding</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• SecurityMaster registers as partner</li>
                        <li>• Partner DID created on Dhiway network</li>
                        <li>• Access to partner dashboard granted</li>
                        <li>• Integration credentials configured</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Phase 2: Worker Management</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Batch invite 100+ security guards</li>
                        <li>• Individual DIDs created for each worker</li>
                        <li>• Mobile app registration workflow</li>
                        <li>• Document upload and verification</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Phase 3: Verification & Trust</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• DigiLocker integration for govt documents</li>
                        <li>• Automatic VC issuance for verified docs</li>
                        <li>• Trust score calculation algorithm</li>
                        <li>• Achievement certificates from SecurityMaster</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold">Phase 4: Operations</h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Real-time worker status monitoring</li>
                        <li>• QR code credential sharing</li>
                        <li>• Client verification workflows</li>
                        <li>• Analytics and reporting dashboard</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="partner" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>SecurityMaster Partner Registration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Company Information</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p><strong>Company:</strong> SecurityMaster Services Pvt Ltd</p>
                        <p><strong>Registration:</strong> U74999DL2015PTC123456</p>
                        <p><strong>GST:</strong> 07AABCS1234F1Z5</p>
                      </div>
                      <div>
                        <p><strong>Address:</strong> Cyber City, Gurgaon</p>
                        <p><strong>Phone:</strong> +91-124-4567890</p>
                        <p><strong>Email:</strong> admin@securitymaster.com</p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handlePartnerRegistration}
                    disabled={didLoading || partnerDID !== null}
                    className="w-full"
                  >
                    {didLoading ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Creating Partner DID...
                      </>
                    ) : partnerDID ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Partner DID Created
                      </>
                    ) : (
                      'Create Partner DID on Dhiway Network'
                    )}
                  </Button>

                  {partnerDID && (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-800">Partner DID Created Successfully</span>
                      </div>
                      <div className="bg-white p-3 rounded border">
                        <code className="text-sm text-primary break-all">{partnerDID}</code>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge>Type: Partner Entity</Badge>
                        <Badge variant="secondary">Network: Dhiway Sandbox</Badge>
                        <Badge variant="outline">Status: Active</Badge>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="workers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Batch Worker Onboarding</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={handleBatchWorkerOnboarding}
                    disabled={batchProcessing || !partnerDID}
                    className="w-full"
                  >
                    {batchProcessing ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Processing Batch Registration...
                      </>
                    ) : (
                      'Onboard 5 SecurityMaster Workers'
                    )}
                  </Button>

                  {!partnerDID && (
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                        <span className="text-yellow-800">Create partner DID first</span>
                      </div>
                    </div>
                  )}

                  {workers.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">Registered Workers</h4>
                      <div className="grid grid-cols-1 gap-4">
                        {workers.map((worker) => (
                          <Card key={worker.id} className="border">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h5 className="font-medium">{worker.name}</h5>
                                  <p className="text-sm text-gray-600">ID: {worker.employeeId}</p>
                                  <p className="text-sm text-gray-600">Phone: {worker.phone}</p>
                                  {worker.did && (
                                    <p className="text-xs text-gray-500 mt-1">
                                      DID: {worker.did.substring(0, 30)}...
                                    </p>
                                  )}
                                </div>
                                <div className="text-right">
                                  <Badge className={
                                    worker.status === 'active' ? 'bg-green-100 text-green-800' :
                                    worker.status === 'verified' ? 'bg-blue-100 text-blue-800' :
                                    worker.status === 'registered' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-gray-100 text-gray-800'
                                  }>
                                    {worker.status}
                                  </Badge>
                                  {worker.trustScore && (
                                    <p className="text-sm font-medium mt-1">
                                      Trust: {worker.trustScore}/100
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex space-x-2 mt-3">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleDocumentVerification(worker.id)}
                                  disabled={worker.status !== 'registered'}
                                >
                                  Verify Documents
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleIssueCertificate(worker.id)}
                                  disabled={worker.status !== 'verified'}
                                >
                                  Issue Certificate
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleCalculateTrustScore(worker.id)}
                                  disabled={worker.credentials.length === 0}
                                >
                                  Calculate Trust
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="verification" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Document Verification & Credential Issuance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center space-x-2">
                        <Database className="h-5 w-5 text-primary" />
                        <span>DigiLocker Integration</span>
                      </h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Automatic Aadhaar verification</li>
                        <li>• PAN card validation</li>
                        <li>• Voter ID verification</li>
                        <li>• Educational certificate validation</li>
                        <li>• Real-time verification status</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <span>Credential Types</span>
                      </h4>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Government ID credentials</li>
                        <li>• Educational qualifications</li>
                        <li>• Skill certifications</li>
                        <li>• SecurityMaster achievement awards</li>
                        <li>• Training completion certificates</li>
                      </ul>
                    </div>
                  </div>

                  <Separator />

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Verification Workflow</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div className="text-center">
                        <div className="bg-blue-100 p-3 rounded-lg mb-2">
                          <Smartphone className="h-6 w-6 text-blue-600 mx-auto" />
                        </div>
                        <p className="font-medium">1. Upload</p>
                        <p className="text-gray-600">Worker uploads document via mobile app</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-yellow-100 p-3 rounded-lg mb-2">
                          <Database className="h-6 w-6 text-yellow-600 mx-auto" />
                        </div>
                        <p className="font-medium">2. Verify</p>
                        <p className="text-gray-600">DigiLocker API validates document</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-green-100 p-3 rounded-lg mb-2">
                          <FileText className="h-6 w-6 text-green-600 mx-auto" />
                        </div>
                        <p className="font-medium">3. Issue VC</p>
                        <p className="text-gray-600">Mark Studio creates verifiable credential</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-purple-100 p-3 rounded-lg mb-2">
                          <Network className="h-6 w-6 text-purple-600 mx-auto" />
                        </div>
                        <p className="font-medium">4. Anchor</p>
                        <p className="text-gray-600">Credential anchored on Dhiway network</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>SecurityMaster Analytics Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Onboarding Progress</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Invited</span>
                            <span>100</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Registered</span>
                            <span>{workers.length}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Verified</span>
                            <span>{workers.filter(w => w.status === 'verified').length}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Active</span>
                            <span>{workers.filter(w => w.status === 'active').length}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Trust Score Distribution</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>90-100</span>
                            <span>{workers.filter(w => w.trustScore && w.trustScore >= 90).length}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>80-89</span>
                            <span>{workers.filter(w => w.trustScore && w.trustScore >= 80 && w.trustScore < 90).length}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>70-79</span>
                            <span>{workers.filter(w => w.trustScore && w.trustScore >= 70 && w.trustScore < 80).length}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Below 70</span>
                            <span>{workers.filter(w => w.trustScore && w.trustScore < 70).length}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Credential Types</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Government IDs</span>
                            <span>{workers.filter(w => w.credentials.includes('voter-id')).length}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Achievements</span>
                            <span>{workers.filter(w => w.credentials.includes('achievement-certificate')).length}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Training</span>
                            <span>0</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Skills</span>
                            <span>0</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Integration Benefits for SecurityMaster</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-semibold">Operational Benefits</h4>
                          <ul className="text-sm space-y-1 text-gray-600">
                            <li>• 90% reduction in document verification time</li>
                            <li>• Automated compliance reporting</li>
                            <li>• Real-time worker status tracking</li>
                            <li>• Reduced fraud and identity theft</li>
                            <li>• Streamlined client verification process</li>
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold">Business Impact</h4>
                          <ul className="text-sm space-y-1 text-gray-600">
                            <li>• Enhanced client trust and confidence</li>
                            <li>• Premium pricing for verified workforce</li>
                            <li>• Faster deployment to client sites</li>
                            <li>• Improved worker retention and motivation</li>
                            <li>• Competitive advantage in security industry</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityMasterDemo;