
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import TrustScore from "@/components/TrustScore";
import DIDDisplay from "@/components/DIDDisplay";
import CredentialCard from "@/components/CredentialCard";
import WorkerOnboarding from "@/components/WorkerOnboarding";
import DocumentUpload from "@/components/DocumentUpload";

const Index = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);

  // Mock data for demonstration
  const mockCredentials = [
    {
      title: "Voter ID Card",
      issuer: "Election Commission of India",
      issueDate: "2023-01-15",
      status: "verified" as const,
      type: "document" as const,
      vcUrl: "https://cord-vc.dhiway.com/credential/voter-123"
    },
    {
      title: "Security Training Certificate",
      issuer: "Security Plus Services",
      issueDate: "2023-06-20",
      status: "verified" as const,
      type: "skill" as const,
      vcUrl: "https://cord-vc.dhiway.com/credential/training-456"
    },
    {
      title: "10th Grade Mark Sheet",
      issuer: "CBSE Board",
      issueDate: "2023-03-10",
      status: "pending" as const,
      type: "document" as const,
    },
    {
      title: "Excellence in Service",
      issuer: "SafeWatch Security",
      issueDate: "2023-11-05",
      status: "verified" as const,
      type: "certification" as const,
      vcUrl: "https://cord-vc.dhiway.com/credential/excellence-789"
    }
  ];

  if (!isOnboarded) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to UpandUp Identity Hub
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create your permanent digital identity on the CORD blockchain network. 
              Build trust, showcase your skills, and unlock new opportunities in the gig economy.
            </p>
          </div>
          <WorkerOnboarding />
          <div className="text-center mt-8">
            <button
              onClick={() => setIsOnboarded(true)}
              className="text-primary hover:underline"
            >
              Skip to Dashboard (Demo)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, Rajesh Kumar
          </h1>
          <p className="text-gray-600">
            Manage your digital identity and credentials on the CORD blockchain
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <DIDDisplay
                  did="did:cord:3x7MQY8Mz8YMW9w9cZ2jKd4N1xQ8VzYr2Pq5Fg7Hm6Kj"
                  blockchainStatus="active"
                  createdDate="2023-10-15"
                />
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Recent Credentials</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockCredentials.slice(0, 4).map((credential, index) => (
                      <CredentialCard key={index} {...credential} />
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <TrustScore
                  score={85}
                  totalCredentials={12}
                  verifiedCredentials={9}
                  employerVerified={true}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="credentials" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-6">All Credentials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockCredentials.map((credential, index) => (
                  <CredentialCard key={index} {...credential} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <DocumentUpload />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <DIDDisplay
                  did="did:cord:3x7MQY8Mz8YMW9w9cZ2jKd4N1xQ8VzYr2Pq5Fg7Hm6Kj"
                  blockchainStatus="active"
                  createdDate="2023-10-15"
                />
              </div>
              <div>
                <TrustScore
                  score={85}
                  totalCredentials={12}
                  verifiedCredentials={9}
                  employerVerified={true}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
