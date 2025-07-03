
// Documentation page for the development team

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import CORDIntegrationDemo from "@/components/CORDIntegrationDemo";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Code, 
  Wrench, 
  BookOpen, 
  ExternalLink,
  Github,
  Database,
  Smartphone
} from "lucide-react";

const Documentation = () => {
  const codeExamples = [
    {
      title: "DID Creation with CORD SDK",
      language: "typescript",
      code: `// Example: Creating a DID for a worker
import { CORDService } from '@/services/cordService';

const cordService = new CORDService(config);

const createWorkerDID = async (workerData) => {
  const didResponse = await cordService.createDID({
    workerDetails: {
      name: workerData.name,
      address: workerData.address,
      phone: workerData.phone,
      aadhar: workerData.aadhar,
      employer: workerData.employer
    }
  });
  
  return didResponse.did;
};`
    },
    {
      title: "VC Issuance with Mark Studio",
      language: "typescript",
      code: `// Example: Issuing a Verifiable Credential
const issueCredential = async (documentData) => {
  const vcResponse = await cordService.issueVC({
    workerId: documentData.workerId,
    documentUrl: documentData.documentUrl,
    credentialType: documentData.type,
    issuer: "UpandUp Platform",
    metadata: {
      issueDate: new Date().toISOString(),
      documentHash: documentData.hash
    }
  });
  
  return vcResponse.vcUrl;
};`
    },
    {
      title: "Trust Score Calculation",
      language: "typescript",
      code: `// Example: Calculating worker trust score
const calculateTrust = async (workerId) => {
  const trustData = await cordService.calculateTrustScore(workerId);
  
  // Score factors:
  // - Credential count: 25%
  // - Verification rate: 30%
  // - Employer endorsement: 20%
  // - Blockchain integrity: 15%
  // - Time factor: 10%
  
  return trustData.score;
};`
    }
  ];

  const setupSteps = [
    {
      title: "Environment Setup",
      icon: Wrench,
      steps: [
        "Install Node.js 18+ and npm/yarn",
        "Clone the repository from GitHub",
        "Install dependencies: npm install",
        "Set up Supabase project and get credentials"
      ]
    },
    {
      title: "CORD Integration",
      icon: Database,
      steps: [
        "Register with DHIWAY for CORD network access",
        "Obtain CORD SDK API keys",
        "Configure Mark Studio credentials",
        "Set up blockchain network endpoints"
      ]
    },
    {
      title: "Development",
      icon: Code,
      steps: [
        "Start development server: npm run dev",
        "Configure environment variables",
        "Test CORD integration endpoints",
        "Run test suite: npm test"
      ]
    },
    {
      title: "Deployment",
      icon: Smartphone,
      steps: [
        "Build production bundle: npm run build",
        "Deploy to Vercel/Netlify",
        "Configure production environment",
        "Set up monitoring and analytics"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Development Documentation
          </h1>
          <p className="text-gray-600">
            Complete technical documentation for the UpandUp SSI/VC Identity Hub
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
            <TabsTrigger value="examples">Code Examples</TabsTrigger>
            <TabsTrigger value="setup">Setup Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Design Document</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Comprehensive system architecture and technical specifications
                  </p>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Document
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Github className="h-5 w-5" />
                    <span>Source Code</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Complete React codebase with CORD integration stubs
                  </p>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    GitHub Repository
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>API Reference</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Detailed API documentation for all endpoints and integrations
                  </p>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    API Docs
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Key Features</h4>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>• Decentralized Identity (DID) creation on CORD blockchain</li>
                      <li>• Verifiable Credential (VC) issuance for documents</li>
                      <li>• Trust score calculation and reputation system</li>
                      <li>• Worker onboarding and document management</li>
                      <li>• Employer partnership and verification</li>
                      <li>• Mobile-first responsive design</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Technology Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge>React 18</Badge>
                      <Badge>TypeScript</Badge>
                      <Badge>Tailwind CSS</Badge>
                      <Badge>Supabase</Badge>
                      <Badge>CORD SDK</Badge>
                      <Badge>Mark Studio</Badge>
                      <Badge>Shadcn/UI</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="architecture">
            <ArchitectureDiagram />
          </TabsContent>

          <TabsContent value="integration">
            <CORDIntegrationDemo />
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            {codeExamples.map((example, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{example.title}</span>
                    <Badge variant="outline">{example.language}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <code>{example.code}</code>
                  </pre>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardHeader>
                <CardTitle>Additional Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">CORD Documentation</h4>
                    <ul className="text-sm space-y-1">
                      <li>
                        <a href="https://docs.dhiway.com/cord/sdk" className="text-primary hover:underline flex items-center">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          CORD SDK Documentation
                        </a>
                      </li>
                      <li>
                        <a href="https://docs.dhiway.com/studio/overview/" className="text-primary hover:underline flex items-center">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Mark Studio Overview
                        </a>
                      </li>
                      <li>
                        <a href="https://github.com/dhiway/cord" className="text-primary hover:underline flex items-center">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          CORD GitHub Repository
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Development Tools</h4>
                    <ul className="text-sm space-y-1">
                      <li>
                        <a href="https://supabase.com/docs" className="text-primary hover:underline flex items-center">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Supabase Documentation
                        </a>
                      </li>
                      <li>
                        <a href="https://ui.shadcn.com/" className="text-primary hover:underline flex items-center">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Shadcn/UI Components
                        </a>
                      </li>
                      <li>
                        <a href="https://tailwindcss.com/docs" className="text-primary hover:underline flex items-center">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Tailwind CSS Docs
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="setup" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {setupSteps.map((section, index) => {
                const IconComponent = section.icon;
                return (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <IconComponent className="h-5 w-5" />
                        <span>{section.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="text-sm space-y-2">
                        {section.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start space-x-2">
                            <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-0.5">
                              {stepIndex + 1}
                            </span>
                            <span className="text-gray-600">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Environment Variables</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm">
                  <code>{`# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# CORD SDK Configuration
CORD_NETWORK_URL=https://cord-network-url.com
CORD_API_KEY=your_cord_api_key
CORD_DID=did:cord:upandup-issuer
CORD_PRIVATE_KEY=your_private_key

# Mark Studio Configuration
MARK_STUDIO_API_URL=https://mark-studio-api.dhiway.com
MARK_STUDIO_API_KEY=your_mark_studio_api_key
MARK_STUDIO_ORG_ID=upandup-org-id`}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Documentation;
