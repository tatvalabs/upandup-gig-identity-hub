import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Users, Award, Briefcase, Network, Database, Building2 } from 'lucide-react';
import Header from '@/components/Header';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import DhiwayIntegrationDemo from '@/components/DhiwayIntegrationDemo';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Powered by Dhiway Blockchain Network
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            The Future of <span className="text-primary">Workforce Identity</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            UpandUp revolutionizes gig worker identity verification through blockchain-based 
            credentials, creating a trusted ecosystem for workers, employers, and platforms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/partner-onboarding">
                Start Partner Onboarding <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/securitymaster">
                SecurityMaster Case Study
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SecurityMaster Case Study Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              SecurityMaster Success Story
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how SecurityMaster Services transformed their workforce management 
              with UpandUp's blockchain-based identity verification platform.
            </p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Building2 className="h-8 w-8 text-primary" />
                <span>SecurityMaster Services Pvt Ltd</span>
              </CardTitle>
              <CardDescription>
                Leading security service provider managing 1000+ guards across Delhi NCR
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                  <p className="text-gray-600">Security Guards</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">90%</div>
                  <p className="text-gray-600">Faster Verification</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                  <p className="text-gray-600">Document Authenticity</p>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">Implementation Highlights</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-blue-800">
                    <li>• Batch onboarded 1000+ workers in 2 weeks</li>
                    <li>• DigiLocker integration for instant verification</li>
                    <li>• QR code-based client verification system</li>
                  </ul>
                  <ul className="space-y-2 text-blue-800">
                    <li>• Dynamic trust scoring for all workers</li>
                    <li>• Achievement certificates for motivation</li>
                    <li>• Mobile app for worker credential management</li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-center">
                <Button asChild size="lg">
                  <Link to="/securitymaster">
                    View Complete Case Study <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Identity Management Platform
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From onboarding to verification, we provide end-to-end solutions for 
              digital identity management in the gig economy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Shield className="h-8 w-8 text-primary" />
                  <CardTitle>Blockchain Identity</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Create tamper-proof digital identities using Dhiway blockchain network 
                  with DID (Decentralized Identifiers) and verifiable credentials.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Database className="h-8 w-8 text-primary" />
                  <CardTitle>DigiLocker Integration</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Seamlessly verify government documents through DigiLocker integration 
                  for Aadhaar, PAN, Voter ID, and educational certificates.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="h-8 w-8 text-primary" />
                  <CardTitle>Partner Network</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Enable security agencies, delivery platforms, and gig economy companies 
                  to onboard and manage workers with verified credentials.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Award className="h-8 w-8 text-primary" />
                  <CardTitle>Trust Scoring</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Build reputation through verified credentials, employer endorsements, 
                  and blockchain-verified achievements with dynamic trust scores.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-8 w-8 text-primary" />
                  <CardTitle>Mobile App Ready</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Workers can manage their digital identity, share credentials, and 
                  apply for jobs through our mobile application.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Network className="h-8 w-8 text-primary" />
                  <CardTitle>API Integration</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Complete REST API suite for partners to integrate UpandUp's 
                  identity verification into their existing systems.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Blockchain-Powered Architecture
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built on Dhiway's enterprise blockchain infrastructure with proven 
              scalability and security for identity management.
            </p>
          </div>
          <ArchitectureDiagram />
        </div>
      </section>

      {/* Dhiway Integration Demo Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Live Dhiway Sandbox Integration
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience our complete integration with Dhiway's sandbox environment 
              including DID creation, credential issuance, and verification.
            </p>
          </div>
          <DhiwayIntegrationDemo />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Workforce Management?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join the revolution in digital identity verification. Start onboarding 
            your workers with blockchain-verified credentials today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/partner-onboarding">
                Become a Partner <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary" asChild>
              <Link to="/documentation">
                Integration Guide
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;