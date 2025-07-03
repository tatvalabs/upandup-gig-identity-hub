// Interactive Architecture Diagram Component

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Smartphone, 
  Monitor, 
  Database, 
  Cloud, 
  Shield, 
  FileText, 
  Users, 
  ArrowRight,
  Network,
  CheckCircle
} from "lucide-react";

const ArchitectureDiagram = () => {
  const components = [
    {
      name: "Mobile App",
      icon: Smartphone,
      description: "Worker onboarding and credential management",
      tech: ["React Native", "TypeScript"],
      status: "planned"
    },
    {
      name: "Web Dashboard",
      icon: Monitor,
      description: "Employer portal and admin interface",
      tech: ["React", "Tailwind CSS"],
      status: "active"
    },
    {
      name: "Supabase Backend",
      icon: Database,
      description: "Database, authentication, and file storage",
      tech: ["PostgreSQL", "Edge Functions"],
      status: "active"
    },
    {
      name: "CORD Blockchain",
      icon: Network,
      description: "DID creation and blockchain operations",
      tech: ["CORD SDK", "Blockchain"],
      status: "integration"
    },
    {
      name: "Mark Studio",
      icon: FileText,
      description: "Verifiable credential issuance",
      tech: ["Mark Studio API", "VC Templates"],
      status: "integration"
    },
    {
      name: "Trust Engine",
      icon: Shield,
      description: "Reputation and trust score calculation",
      tech: ["Algorithm", "Analytics"],
      status: "development"
    }
  ];

  const dataFlow = [
    { from: "Worker Registration", to: "DID Creation", description: "Basic details submitted" },
    { from: "Document Upload", to: "VC Issuance", description: "Documents converted to VCs" },
    { from: "Credentials", to: "Trust Score", description: "Reputation calculation" },
    { from: "Blockchain", to: "Verification", description: "Immutable proof" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "development": return "bg-blue-100 text-blue-800";
      case "integration": return "bg-yellow-100 text-yellow-800";
      case "planned": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <CheckCircle className="h-4 w-4" />;
      case "development": return <Cloud className="h-4 w-4" />;
      case "integration": return <ArrowRight className="h-4 w-4" />;
      case "planned": return <Users className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Architecture Overview</CardTitle>
          <p className="text-gray-600">
            Interactive visualization of the UpandUp SSI/VC platform architecture
          </p>
        </CardHeader>
        <CardContent>
          {/* Component Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {components.map((component, index) => {
              const IconComponent = component.icon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{component.name}</h3>
                        <Badge className={getStatusColor(component.status)} variant="secondary">
                          {getStatusIcon(component.status)}
                          <span className="ml-1 capitalize">{component.status}</span>
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{component.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {component.tech.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Data Flow Visualization */}
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-lg">Data Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dataFlow.map((flow, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                    <div className="text-sm font-medium text-gray-800">{flow.from}</div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div className="text-sm font-medium text-gray-800">{flow.to}</div>
                    <div className="text-xs text-gray-500 ml-auto">{flow.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Integration Points */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Key Integration Points</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center space-x-2">
                    <Network className="h-5 w-5 text-primary" />
                    <span>CORD Blockchain Integration</span>
                  </h4>
                  <ul className="text-sm space-y-1 text-gray-600 ml-7">
                    <li>• DID creation and management</li>
                    <li>• Blockchain verification</li>
                    <li>• Immutable credential registry</li>
                    <li>• Network consensus validation</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span>Mark Studio Integration</span>
                  </h4>
                  <ul className="text-sm space-y-1 text-gray-600 ml-7">
                    <li>• Document processing pipeline</li>
                    <li>• VC template management</li>
                    <li>• Credential issuance workflow</li>
                    <li>• Digital signature handling</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Development Roadmap */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Development Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium text-green-800">Phase 1: Core Infrastructure</div>
                    <div className="text-sm text-green-600">UI components, basic flows, database setup</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <ArrowRight className="h-5 w-5 text-yellow-600" />
                  <div>
                    <div className="font-medium text-yellow-800">Phase 2: Blockchain Integration</div>
                    <div className="text-sm text-yellow-600">CORD SDK integration, DID/VC implementation</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <Cloud className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-blue-800">Phase 3: Advanced Features</div>
                    <div className="text-sm text-blue-600">Trust scoring, analytics, mobile app</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <Users className="h-5 w-5 text-gray-600" />
                  <div>
                    <div className="font-medium text-gray-800">Phase 4: Production Deployment</div>
                    <div className="text-sm text-gray-600">Security audit, performance optimization, scaling</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArchitectureDiagram;
