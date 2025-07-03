
// Demo component showing CORD integration capabilities

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, AlertCircle, Blockchain, FileText, Shield } from "lucide-react";
import { useDIDCreation, useVCIssuance, useTrustScore } from "@/hooks/useCORD";

const CORDIntegrationDemo = () => {
  const [workerName, setWorkerName] = useState("Rajesh Kumar");
  const [workerPhone, setWorkerPhone] = useState("+91-9876543210");
  const [lastCreatedDID, setLastCreatedDID] = useState<string | null>(null);
  const [lastIssuedVC, setLastIssuedVC] = useState<string | null>(null);
  
  const { createDID, isLoading: didLoading } = useDIDCreation();
  const { issueVC, isLoading: vcLoading } = useVCIssuance();
  const { calculateTrustScore, isLoading: trustLoading } = useTrustScore();

  const handleCreateDID = async () => {
    const response = await createDID({
      workerDetails: {
        name: workerName,
        address: "123 Main Street, Delhi",
        phone: workerPhone,
        aadhar: "xxxx-xxxx-1234",
        employer: "Security Plus Services"
      }
    });

    if (response) {
      setLastCreatedDID(response.did);
    }
  };

  const handleIssueVC = async () => {
    if (!lastCreatedDID) return;

    const response = await issueVC({
      workerId: lastCreatedDID,
      documentUrl: "https://example.com/voter-id.pdf",
      credentialType: "voter-id",
      issuer: "Election Commission of India",
      metadata: {
        issueDate: new Date().toISOString(),
        documentHash: "sha256:abcd1234...",
      }
    });

    if (response) {
      setLastIssuedVC(response.vcUrl);
    }
  };

  const handleCalculateTrust = async () => {
    if (!lastCreatedDID) return;
    
    const response = await calculateTrustScore(lastCreatedDID);
    console.log('Trust score calculated:', response);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Blockchain className="h-6 w-6 text-primary" />
            <span>CORD Blockchain Integration Demo</span>
          </CardTitle>
          <p className="text-gray-600">
            This demo shows the integration with CORD SDK and Mark Studio for DID creation and VC issuance.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Worker Details Input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Worker Name</Label>
              <Input
                id="name"
                value={workerName}
                onChange={(e) => setWorkerName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={workerPhone}
                onChange={(e) => setWorkerPhone(e.target.value)}
              />
            </div>
          </div>

          <Separator />

          {/* DID Creation Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Step 1: Create DID on CORD Blockchain</span>
              </h3>
              <Button 
                onClick={handleCreateDID}
                disabled={didLoading || !workerName || !workerPhone}
              >
                {didLoading ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Creating DID...
                  </>
                ) : (
                  'Create DID'
                )}
              </Button>
            </div>

            {lastCreatedDID && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800">DID Created Successfully</span>
                </div>
                <div className="bg-white p-3 rounded border">
                  <code className="text-sm text-primary break-all">{lastCreatedDID}</code>
                </div>
                <Badge variant="secondary" className="mt-2">
                  Status: Confirmed on CORD Network
                </Badge>
              </div>
            )}
          </div>

          <Separator />

          {/* VC Issuance Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Step 2: Issue Verifiable Credential</span>
              </h3>
              <Button 
                onClick={handleIssueVC}
                disabled={vcLoading || !lastCreatedDID}
              >
                {vcLoading ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Issuing VC...
                  </>
                ) : (
                  'Issue Sample VC'
                )}
              </Button>
            </div>

            {!lastCreatedDID && (
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <span className="text-yellow-800">Create a DID first to issue credentials</span>
                </div>
              </div>
            )}

            {lastIssuedVC && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Verifiable Credential Issued</span>
                </div>
                <div className="bg-white p-3 rounded border">
                  <code className="text-sm text-primary break-all">{lastIssuedVC}</code>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge>Type: Voter ID</Badge>
                  <Badge variant="secondary">Issuer: Election Commission</Badge>
                  <Badge variant="outline">Status: Active</Badge>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Trust Score Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Step 3: Calculate Trust Score</h3>
              <Button 
                onClick={handleCalculateTrust}
                disabled={trustLoading || !lastCreatedDID}
                variant="outline"
              >
                {trustLoading ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  'Calculate Trust Score'
                )}
              </Button>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                Trust score is calculated based on verified credentials, employer endorsements, 
                and blockchain integrity checks. This creates a reputation system for gig workers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Notes for Development Team</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold">CORD SDK Integration</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Install CORD SDK: <code>npm install @dhiway/cord-sdk</code></li>
                <li>• Configure network endpoints</li>
                <li>• Set up authentication keys</li>
                <li>• Handle async blockchain operations</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Mark Studio Integration</h4>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• API key configuration</li>
                <li>• Document upload handling</li>
                <li>• VC template management</li>
                <li>• Status polling for issuance</li>
              </ul>
            </div>
          </div>
          
          <Separator />
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">🚧 Development Status</h4>
            <p className="text-sm text-yellow-700">
              This demo uses mock implementations. Replace with actual CORD SDK and Mark Studio 
              integrations in production. See <code>src/services/cordService.ts</code> for 
              implementation stubs.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CORDIntegrationDemo;
