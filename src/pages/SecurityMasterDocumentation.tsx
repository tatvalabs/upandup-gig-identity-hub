// Comprehensive SecurityMaster Documentation Page

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Users, 
  Shield, 
  FileText, 
  Smartphone,
  Database,
  Network,
  Award,
  ExternalLink,
  Code,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import Header from "@/components/Header";
import SecurityMasterDemo from "@/components/SecurityMasterDemo";

const SecurityMasterDocumentation = () => {
  const apiEndpoints = [
    {
      method: "POST",
      endpoint: "/api/partners/register",
      description: "Register SecurityMaster as a partner",
      example: `{
  "name": "SecurityMaster Services Pvt Ltd",
  "email": "admin@securitymaster.com",
  "phone": "+91-124-4567890",
  "address": "Cyber City, Gurgaon, Haryana",
  "registrationNumber": "U74999DL2015PTC123456",
  "gstNumber": "07AABCS1234F1Z5"
}`
    },
    {
      method: "POST",
      endpoint: "/api/workers/batch-invite",
      description: "Batch invite SecurityMaster workers",
      example: `{
  "partnerId": "uuid-partner-id",
  "workers": [
    {
      "name": "Rajesh Kumar",
      "phone": "+91-9876543210",
      "employeeId": "SM001",
      "email": "rajesh@securitymaster.com"
    }
  ]
}`
    },
    {
      method: "POST",
      endpoint: "/api/credentials/verify-digilocker",
      description: "Verify documents through DigiLocker",
      example: `{
  "workerId": "uuid-worker-id",
  "documentType": "voter-id",
  "aadhaarNumber": "xxxx-xxxx-1234",
  "consent": true
}`
    },
    {
      method: "POST",
      endpoint: "/api/credentials/issue-achievement",
      description: "Issue SecurityMaster achievement certificate",
      example: `{
  "workerId": "uuid-worker-id",
  "certificateType": "excellence",
  "title": "Outstanding Security Performance",
  "description": "Awarded for exceptional service delivery"
}`
    }
  ];

  const integrationSteps = [
    {
      step: 1,
      title: "Partner Registration",
      description: "SecurityMaster registers with UpandUp platform",
      details: [
        "Submit company registration details",
        "Verify business credentials",
        "Create partner DID on Dhiway network",
        "Receive API credentials and dashboard access"
      ],
      code: `// Partner Registration API Call
const registerPartner = async () => {
  const response = await fetch('/api/partners/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      name: "SecurityMaster Services Pvt Ltd",
      email: "admin@securitymaster.com",
      phone: "+91-124-4567890",
      address: "Cyber City, Gurgaon, Haryana",
      registrationNumber: "U74999DL2015PTC123456"
    })
  });
  
  const result = await response.json();
  console.log('Partner DID:', result.did);
};`
    },
    {
      step: 2,
      title: "Worker Onboarding",
      description: "Batch invite and onboard security guards",
      details: [
        "Upload worker list via CSV or API",
        "Send SMS invitations to workers",
        "Workers download UpandUp mobile app",
        "Individual DIDs created for each worker"
      ],
      code: `// Batch Worker Invitation
const inviteWorkers = async (workers) => {
  const response = await fetch('/api/workers/batch-invite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      partnerId: 'your-partner-id',
      workers: workers.map(w => ({
        name: w.name,
        phone: w.phone,
        employeeId: w.employeeId,
        email: w.email
      }))
    })
  });
  
  return await response.json();
};`
    },
    {
      step: 3,
      title: "Document Verification",
      description: "Automated verification through DigiLocker",
      details: [
        "Workers upload government documents",
        "DigiLocker API validates documents",
        "Mark Studio creates credential schemas",
        "Verifiable credentials issued automatically"
      ],
      code: `// DigiLocker Document Verification
const verifyDocument = async (workerId, documentType) => {
  const response = await fetch('/api/credentials/verify-digilocker', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      workerId: workerId,
      documentType: documentType,
      consent: true
    })
  });
  
  const result = await response.json();
  if (result.verified) {
    // Automatically issue VC
    await issueVerifiableCredential(workerId, result.documentData);
  }
};`
    },
    {
      step: 4,
      title: "Trust Score Calculation",
      description: "Dynamic trust scoring based on credentials",
      details: [
        "Analyze verified credentials portfolio",
        "Factor in employer endorsements",
        "Consider blockchain integrity checks",
        "Generate dynamic trust score (0-100)"
      ],
      code: `// Trust Score Calculation
const calculateTrustScore = async (workerId) => {
  const response = await fetch(\`/api/workers/\${workerId}/trust-score\`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  });
  
  const trustData = await response.json();
  return {
    score: trustData.score,
    factors: trustData.factors,
    breakdown: trustData.breakdown
  };
};`
    },
    {
      step: 5,
      title: "Achievement Certificates",
      description: "Issue performance-based certificates",
      details: [
        "SecurityMaster issues achievement awards",
        "Certificates stored as verifiable credentials",
        "Blockchain-anchored proof of recognition",
        "Portable across platforms and employers"
      ],
      code: `// Issue Achievement Certificate
const issueAchievement = async (workerId, achievement) => {
  const response = await fetch('/api/credentials/issue-achievement', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      workerId: workerId,
      certificateType: achievement.type,
      title: achievement.title,
      description: achievement.description,
      validationCode: generateValidationCode()
    })
  });
  
  return await response.json();
};`
    }
  ];

  const mobileAppFeatures = [
    {
      feature: "Digital Identity Wallet",
      description: "Secure storage of all credentials and certificates",
      benefits: ["Offline access", "Encrypted storage", "Biometric protection"]
    },
    {
      feature: "QR Code Sharing",
      description: "Instant credential verification via QR codes",
      benefits: ["Quick client verification", "Contactless sharing", "Real-time validation"]
    },
    {
      feature: "Trust Score Display",
      description: "Visual representation of worker's trust score",
      benefits: ["Gamification", "Motivation to improve", "Transparent scoring"]
    },
    {
      feature: "Achievement Gallery",
      description: "Showcase of all earned certificates and awards",
      benefits: ["Professional portfolio", "Career progression", "Skill validation"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            SecurityMaster Integration Guide
          </h1>
          <p className="text-gray-600">
            Complete documentation for SecurityMaster's integration with UpandUp platform using Dhiway sandbox environment
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
            <TabsTrigger value="api">API Reference</TabsTrigger>
            <TabsTrigger value="mobile">Mobile App</TabsTrigger>
            <TabsTrigger value="demo">Live Demo</TabsTrigger>
            <TabsTrigger value="deployment">Deployment</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="h-6 w-6 text-primary" />
                  <span>SecurityMaster Use Case</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Business Challenge</h3>
                  <p className="text-blue-800 mb-4">
                    SecurityMaster Services Pvt Ltd manages 1000+ security guards across Delhi NCR. 
                    They face challenges with document verification, worker trust assessment, and 
                    client confidence in their workforce quality.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Current Pain Points</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Manual document verification (2-3 days)</li>
                        <li>• Fake document submissions</li>
                        <li>• Client trust and verification issues</li>
                        <li>• No standardized skill assessment</li>
                        <li>• Worker motivation and retention</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">UpandUp Solution</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Instant DigiLocker verification</li>
                        <li>• Blockchain-secured credentials</li>
                        <li>• QR code instant verification</li>
                        <li>• Dynamic trust scoring system</li>
                        <li>• Achievement-based motivation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Users className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">1000+ Workers</h4>
                          <p className="text-sm text-gray-600">Security guards across NCR</p>
                        </div>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Batch onboarding capability</li>
                        <li>• Individual DID creation</li>
                        <li>• Mobile app registration</li>
                        <li>• Document verification</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Shield className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Trust Scoring</h4>
                          <p className="text-sm text-gray-600">Dynamic reputation system</p>
                        </div>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Credential-based scoring</li>
                        <li>• Employer endorsements</li>
                        <li>• Blockchain integrity</li>
                        <li>• Performance tracking</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Award className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Achievements</h4>
                          <p className="text-sm text-gray-600">Performance recognition</p>
                        </div>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Excellence certificates</li>
                        <li>• Skill validations</li>
                        <li>• Training completions</li>
                        <li>• Client appreciations</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Implementation Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="bg-blue-100 p-4 rounded-lg mb-3">
                          <span className="text-2xl font-bold text-blue-600">Week 1</span>
                        </div>
                        <h4 className="font-semibold mb-2">Setup & Integration</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Partner registration</li>
                          <li>• API integration</li>
                          <li>• Sandbox testing</li>
                        </ul>
                      </div>
                      <div className="text-center">
                        <div className="bg-yellow-100 p-4 rounded-lg mb-3">
                          <span className="text-2xl font-bold text-yellow-600">Week 2</span>
                        </div>
                        <h4 className="font-semibold mb-2">Pilot Batch</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• 50 worker pilot</li>
                          <li>• Document verification</li>
                          <li>• Mobile app training</li>
                        </ul>
                      </div>
                      <div className="text-center">
                        <div className="bg-green-100 p-4 rounded-lg mb-3">
                          <span className="text-2xl font-bold text-green-600">Week 3-4</span>
                        </div>
                        <h4 className="font-semibold mb-2">Full Rollout</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Batch onboard 1000+</li>
                          <li>• Trust score calculation</li>
                          <li>• Achievement system</li>
                        </ul>
                      </div>
                      <div className="text-center">
                        <div className="bg-purple-100 p-4 rounded-lg mb-3">
                          <span className="text-2xl font-bold text-purple-600">Ongoing</span>
                        </div>
                        <h4 className="font-semibold mb-2">Operations</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Client verifications</li>
                          <li>• Performance tracking</li>
                          <li>• Continuous improvement</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integration" className="space-y-6">
            <div className="space-y-6">
              {integrationSteps.map((step, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                      <span>{step.title}</span>
                    </CardTitle>
                    <p className="text-gray-600">{step.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Implementation Steps</h4>
                        <ul className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-600">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Code Example</h4>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{step.code}</code>
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dhiway Sandbox API Endpoints</CardTitle>
                <p className="text-gray-600">
                  All API endpoints use the Dhiway sandbox environment: <code>https://sandbox.dedi.global</code>
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">🔧 Sandbox Configuration</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Base URL:</strong> https://sandbox.dedi.global</p>
                      <p><strong>Environment:</strong> Sandbox</p>
                      <p><strong>API Version:</strong> v1</p>
                    </div>
                    <div>
                      <p><strong>Authentication:</strong> Bearer Token</p>
                      <p><strong>Content-Type:</strong> application/json</p>
                      <p><strong>Rate Limit:</strong> 1000 requests/hour</p>
                    </div>
                  </div>
                </div>

                {apiEndpoints.map((endpoint, index) => (
                  <Card key={index} className="border">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Badge variant={endpoint.method === 'POST' ? 'default' : 'secondary'}>
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm">{endpoint.endpoint}</code>
                      </div>
                      <p className="text-gray-600">{endpoint.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Request Example</h4>
                          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                            <code>{endpoint.example}</code>
                          </pre>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Headers</h4>
                          <pre className="bg-gray-100 p-3 rounded text-sm">
                            <code>{`Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
X-Organization-Id: your-org-id
X-Environment: sandbox`}</code>
                          </pre>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card>
                  <CardHeader>
                    <CardTitle>Dhiway Service Endpoints</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <h4 className="font-semibold">Core Services</h4>
                        <ul className="text-sm space-y-2">
                          <li>
                            <strong>DEDI Publish:</strong><br />
                            <code className="text-xs">https://sandbox.dedi.global/dedi-publish/api/v1</code>
                          </li>
                          <li>
                            <strong>DEDI Lookup:</strong><br />
                            <code className="text-xs">https://sandbox.dedi.global/dedi-lookup/api/v1</code>
                          </li>
                          <li>
                            <strong>Mark Studio:</strong><br />
                            <code className="text-xs">https://sandbox.dedi.global/mark-studio/api/v1</code>
                          </li>
                          <li>
                            <strong>Issuer Agent:</strong><br />
                            <code className="text-xs">https://sandbox.dedi.global/issuer-agent/api/v1</code>
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold">Additional Services</h4>
                        <ul className="text-sm space-y-2">
                          <li>
                            <strong>Verification:</strong><br />
                            <code className="text-xs">https://sandbox.dedi.global/verification/api/v1</code>
                          </li>
                          <li>
                            <strong>Wallet APIs:</strong><br />
                            <code className="text-xs">https://sandbox.dedi.global/wallet/api/v1</code>
                          </li>
                          <li>
                            <strong>DigiLocker:</strong><br />
                            <code className="text-xs">https://sandbox.dedi.global/issuer-agent-digilocker/api/v1</code>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mobile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Smartphone className="h-6 w-6 text-primary" />
                  <span>UpandUp Mobile App for SecurityMaster Workers</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mobileAppFeatures.map((feature, index) => (
                    <Card key={index} className="border">
                      <CardContent className="p-6">
                        <h4 className="font-semibold mb-2">{feature.feature}</h4>
                        <p className="text-gray-600 mb-3">{feature.description}</p>
                        <div className="space-y-1">
                          {feature.benefits.map((benefit, benefitIndex) => (
                            <div key={benefitIndex} className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm text-gray-600">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Worker Mobile App Workflow</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="bg-blue-100 p-4 rounded-lg mb-3">
                          <Smartphone className="h-8 w-8 text-blue-600 mx-auto" />
                        </div>
                        <h4 className="font-semibold mb-2">1. Download & Register</h4>
                        <p className="text-sm text-gray-600">
                          Worker receives SMS invitation, downloads app, and registers with phone number
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="bg-green-100 p-4 rounded-lg mb-3">
                          <FileText className="h-8 w-8 text-green-600 mx-auto" />
                        </div>
                        <h4 className="font-semibold mb-2">2. Upload Documents</h4>
                        <p className="text-sm text-gray-600">
                          Upload Aadhaar, PAN, Voter ID, and educational certificates for verification
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="bg-purple-100 p-4 rounded-lg mb-3">
                          <Shield className="h-8 w-8 text-purple-600 mx-auto" />
                        </div>
                        <h4 className="font-semibold mb-2">3. Build Trust Score</h4>
                        <p className="text-sm text-gray-600">
                          Earn trust points through verified credentials and SecurityMaster achievements
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="bg-orange-100 p-4 rounded-lg mb-3">
                          <Network className="h-8 w-8 text-orange-600 mx-auto" />
                        </div>
                        <h4 className="font-semibold mb-2">4. Share Credentials</h4>
                        <p className="text-sm text-gray-600">
                          Use QR codes to instantly verify identity and credentials with clients
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>QR Code Verification Process</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="bg-white p-4 rounded-lg shadow mb-3">
                            <div className="w-16 h-16 bg-gray-200 mx-auto rounded flex items-center justify-center">
                              <span className="text-xs">QR</span>
                            </div>
                          </div>
                          <h4 className="font-semibold">Worker Shows QR</h4>
                          <p className="text-sm text-gray-600">SecurityMaster guard displays QR code from mobile app</p>
                        </div>
                        <div className="text-center">
                          <div className="bg-white p-4 rounded-lg shadow mb-3">
                            <Smartphone className="h-16 w-16 text-blue-600 mx-auto" />
                          </div>
                          <h4 className="font-semibold">Client Scans</h4>
                          <p className="text-sm text-gray-600">Client scans QR code using any QR scanner app</p>
                        </div>
                        <div className="text-center">
                          <div className="bg-white p-4 rounded-lg shadow mb-3">
                            <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
                          </div>
                          <h4 className="font-semibold">Instant Verification</h4>
                          <p className="text-sm text-gray-600">Real-time verification of identity and credentials</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demo" className="space-y-6">
            <SecurityMasterDemo />
          </TabsContent>

          <TabsContent value="deployment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Production Deployment Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">⚠️ Production Readiness Checklist</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Obtain production Dhiway API credentials</li>
                    <li>• Update endpoints from sandbox to production</li>
                    <li>• Configure SSL certificates and security headers</li>
                    <li>• Set up monitoring and logging infrastructure</li>
                    <li>• Implement backup and disaster recovery</li>
                    <li>• Complete security audit and penetration testing</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Environment Configuration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm">
                        <code>{`# Production Environment Variables
DHIWAY_API_KEY=prod_api_key_here
DHIWAY_ORG_ID=securitymaster_org_id
DHIWAY_BASE_URL=https://api.dhiway.com
ENVIRONMENT=production

# Database Configuration
DATABASE_URL=postgresql://...
REDIS_URL=redis://...

# Security
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_encryption_key`}</code>
                      </pre>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Monitoring Setup</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Application performance monitoring (APM)</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Error tracking and alerting</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>API endpoint monitoring</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Database performance tracking</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span>Blockchain transaction monitoring</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Go-Live Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="bg-blue-100 p-4 rounded-lg mb-3">
                          <span className="text-2xl font-bold text-blue-600">24/7</span>
                        </div>
                        <h4 className="font-semibold">Technical Support</h4>
                        <p className="text-sm text-gray-600">Dedicated support during initial rollout</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-green-100 p-4 rounded-lg mb-3">
                          <span className="text-2xl font-bold text-green-600">99.9%</span>
                        </div>
                        <h4 className="font-semibold">Uptime SLA</h4>
                        <p className="text-sm text-gray-600">Guaranteed service availability</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-purple-100 p-4 rounded-lg mb-3">
                          <span className="text-2xl font-bold text-purple-600">1000+</span>
                        </div>
                        <h4 className="font-semibold">Scale Ready</h4>
                        <p className="text-sm text-gray-600">Supports SecurityMaster's full workforce</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SecurityMasterDocumentation;