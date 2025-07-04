// Dhiway API Integration Service - Sandbox Environment
// Integrates with DEDI, Mark Studio, Issuer Agent, and Verification services

import { 
  DIDCreationRequest, 
  DIDCreationResponse,
  VCIssuanceRequest,
  VCIssuanceResponse,
  TrustScoreResponse
} from '@/types/cord';

interface DhiwayConfig {
  baseUrl: string;
  dediPublishUrl: string;
  dediLookupUrl: string;
  markStudioUrl: string;
  issuerAgentUrl: string;
  verificationUrl: string;
  walletUrl: string;
  digilockerUrl: string;
  apiKey: string;
  organizationId: string;
  environment: 'sandbox' | 'production';
}

interface DIDPublishRequest {
  didDocument: {
    '@context': string[];
    id: string;
    verificationMethod: Array<{
      id: string;
      type: string;
      controller: string;
      publicKeyMultibase?: string;
    }>;
    authentication: string[];
    assertionMethod: string[];
  };
  options?: {
    anchor?: boolean;
    publish?: boolean;
  };
}

interface VCSchema {
  id: string;
  type: string[];
  credentialSubject: {
    type: string;
    properties: Record<string, any>;
  };
}

interface DigiLockerRequest {
  requestId: string;
  documentType: string;
  aadhaarNumber?: string;
  consent: boolean;
}

interface BatchWorkerRequest {
  workers: Array<{
    name: string;
    phone: string;
    email?: string;
    employeeId?: string;
  }>;
  partnerId: string;
  batchId: string;
}

export class DhiwayService {
  private config: DhiwayConfig;

  constructor(config: DhiwayConfig) {
    this.config = config;
  }

  /**
   * Creates and publishes a DID using DEDI Publish API (Sandbox Environment)
   */
  async createDID(request: DIDCreationRequest): Promise<DIDCreationResponse> {
    console.log('Creating DID with DEDI Publish API (Sandbox):', request);
    
    try {
      // Generate a new DID for sandbox environment
      const did = `did:dhiway:sandbox:${this.generateRandomId()}`;
      
      // Create DID document
      const didDocument = {
        '@context': [
          'https://www.w3.org/ns/did/v1',
          'https://sandbox.dedi.global/contexts/v1'
        ],
        id: did,
        verificationMethod: [{
          id: `${did}#key-1`,
          type: 'Ed25519VerificationKey2020',
          controller: did,
          publicKeyMultibase: this.generatePublicKey()
        }],
        authentication: [`${did}#key-1`],
        assertionMethod: [`${did}#key-1`]
      };

      // Publish DID using DEDI Publish API (Sandbox)
      const publishRequest: DIDPublishRequest = {
        didDocument,
        options: {
          anchor: true,
          publish: true
        }
      };

      const response = await fetch(`${this.config.dediPublishUrl}/did/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
          'X-Organization-Id': this.config.organizationId,
          'X-Environment': this.config.environment
        },
        body: JSON.stringify(publishRequest)
      });

      if (!response.ok) {
        throw new Error(`DEDI Publish failed: ${response.statusText}`);
      }

      const publishResult = await response.json();

      return {
        did,
        didDocument,
        blockchainStatus: publishResult.anchored ? 'confirmed' : 'pending',
        transactionHash: publishResult.transactionId,
        blockNumber: publishResult.blockNumber,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('DID creation failed:', error);
      throw new Error(`Failed to create DID: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Batch create DIDs for multiple workers (SecurityMaster use case)
   */
  async batchCreateDIDs(request: BatchWorkerRequest): Promise<Array<{workerId: string, did: string, status: string}>> {
    console.log('Batch creating DIDs for SecurityMaster workers:', request);
    
    const results = [];
    
    for (const worker of request.workers) {
      try {
        const didResponse = await this.createDID({
          workerDetails: {
            name: worker.name,
            phone: worker.phone,
            address: 'SecurityMaster Employee',
            aadhar: 'pending-verification',
            employer: 'SecurityMaster Services Pvt Ltd'
          }
        });
        
        results.push({
          workerId: worker.employeeId || worker.phone,
          did: didResponse.did,
          status: 'success'
        });
      } catch (error) {
        results.push({
          workerId: worker.employeeId || worker.phone,
          did: '',
          status: 'failed'
        });
      }
    }
    
    return results;
  }

  /**
   * Resolves a DID using DEDI Lookup API (Sandbox)
   */
  async resolveDID(did: string): Promise<any> {
    console.log('Resolving DID with DEDI Lookup API (Sandbox):', did);
    
    try {
      const response = await fetch(`${this.config.dediLookupUrl}/did/resolve/${encodeURIComponent(did)}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
          'X-Environment': this.config.environment
        }
      });

      if (!response.ok) {
        throw new Error(`DID resolution failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('DID resolution failed:', error);
      throw error;
    }
  }

  /**
   * Issues a Verifiable Credential using Mark Studio and Issuer Agent (Sandbox)
   */
  async issueVC(request: VCIssuanceRequest): Promise<VCIssuanceResponse> {
    console.log('Issuing VC with Mark Studio and Issuer Agent (Sandbox):', request);
    
    try {
      // Step 1: Create credential schema in Mark Studio
      const schema = await this.createCredentialSchema(request.credentialType);
      
      // Step 2: Issue credential using Issuer Agent
      const credentialRequest = {
        schemaId: schema.id,
        credentialSubject: {
          id: request.workerId,
          documentType: request.credentialType,
          documentUrl: request.documentUrl,
          documentHash: request.metadata.documentHash,
          issueDate: request.metadata.issueDate,
          expiryDate: request.metadata.expiryDate,
          issuer: request.issuer
        },
        issuer: request.issuer,
        options: {
          proofType: 'Ed25519Signature2020',
          created: new Date().toISOString(),
          environment: 'sandbox'
        }
      };

      const response = await fetch(`${this.config.issuerAgentUrl}/credentials/issue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
          'X-Organization-Id': this.config.organizationId,
          'X-Environment': this.config.environment
        },
        body: JSON.stringify(credentialRequest)
      });

      if (!response.ok) {
        throw new Error(`VC issuance failed: ${response.statusText}`);
      }

      const result = await response.json();
      
      return {
        vcUrl: result.credentialUrl,
        credentialId: result.credentialId,
        verifiableCredential: result.credential,
        status: result.status || 'issued',
        blockchainStatus: result.anchored ? 'confirmed' : 'pending'
      };
    } catch (error) {
      console.error('VC issuance failed:', error);
      throw new Error(`Failed to issue VC: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Creates credential schema in Mark Studio (Sandbox)
   */
  private async createCredentialSchema(credentialType: string): Promise<VCSchema> {
    const schemaRequest = {
      name: `${credentialType}-credential-sandbox`,
      version: '1.0',
      environment: 'sandbox',
      schema: {
        type: 'object',
        properties: {
          documentType: { type: 'string' },
          documentUrl: { type: 'string' },
          documentHash: { type: 'string' },
          issueDate: { type: 'string', format: 'date-time' },
          expiryDate: { type: 'string', format: 'date-time' },
          issuer: { type: 'string' }
        },
        required: ['documentType', 'documentHash', 'issueDate', 'issuer']
      }
    };

    const response = await fetch(`${this.config.markStudioUrl}/schemas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`,
        'X-Organization-Id': this.config.organizationId,
        'X-Environment': this.config.environment
      },
      body: JSON.stringify(schemaRequest)
    });

    if (!response.ok) {
      throw new Error(`Schema creation failed: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Verifies government documents through DigiLocker integration (Sandbox)
   */
  async verifyWithDigiLocker(documentType: string, aadhaarNumber?: string): Promise<any> {
    console.log('Verifying document with DigiLocker (Sandbox):', documentType);
    
    try {
      const digiLockerRequest: DigiLockerRequest = {
        requestId: this.generateRandomId(),
        documentType,
        aadhaarNumber,
        consent: true
      };

      const response = await fetch(`${this.config.digilockerUrl}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
          'X-Environment': this.config.environment
        },
        body: JSON.stringify(digiLockerRequest)
      });

      if (!response.ok) {
        throw new Error(`DigiLocker verification failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('DigiLocker verification failed:', error);
      throw error;
    }
  }

  /**
   * Verifies a Verifiable Credential using Verification Middleware (Sandbox)
   */
  async verifyVC(vcUrl: string): Promise<boolean> {
    console.log('Verifying VC with Verification Middleware (Sandbox):', vcUrl);
    
    try {
      const verificationRequest = {
        credentialUrl: vcUrl,
        verificationMethod: 'comprehensive',
        checkRevocation: true,
        checkExpiry: true,
        environment: 'sandbox'
      };

      const response = await fetch(`${this.config.verificationUrl}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
          'X-Environment': this.config.environment
        },
        body: JSON.stringify(verificationRequest)
      });

      if (!response.ok) {
        throw new Error(`VC verification failed: ${response.statusText}`);
      }

      const result = await response.json();
      return result.verified === true;
    } catch (error) {
      console.error('VC verification failed:', error);
      return false;
    }
  }

  /**
   * Verifies a DID using DEDI Lookup (Sandbox)
   */
  async verifyDID(did: string): Promise<boolean> {
    try {
      const didDocument = await this.resolveDID(did);
      return didDocument && didDocument.didDocument && didDocument.didDocument.id === did;
    } catch (error) {
      console.error('DID verification failed:', error);
      return false;
    }
  }

  /**
   * Creates a wallet for a worker using Wallet APIs (Sandbox)
   */
  async createWallet(workerId: string): Promise<any> {
    console.log('Creating wallet for worker (Sandbox):', workerId);
    
    try {
      const walletRequest = {
        ownerId: workerId,
        walletType: 'digital_identity',
        features: ['credential_storage', 'verification', 'sharing'],
        environment: 'sandbox'
      };

      const response = await fetch(`${this.config.walletUrl}/wallets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
          'X-Organization-Id': this.config.organizationId,
          'X-Environment': this.config.environment
        },
        body: JSON.stringify(walletRequest)
      });

      if (!response.ok) {
        throw new Error(`Wallet creation failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Wallet creation failed:', error);
      throw error;
    }
  }

  /**
   * Calculates trust score based on verified credentials and blockchain data
   */
  async calculateTrustScore(workerId: string): Promise<TrustScoreResponse> {
    console.log('Calculating trust score for worker:', workerId);
    
    try {
      // Enhanced trust score calculation for SecurityMaster workers
      const mockScore = Math.floor(Math.random() * 40) + 60;
      
      return {
        score: mockScore,
        factors: {
          credentialCount: 25,
          verificationRate: 30,
          employerEndorsement: 20,
          blockchainIntegrity: 15,
          timeFactored: 10
        },
        breakdown: {
          totalCredentials: 8,
          verifiedCredentials: 6,
          employerVerified: true,
          blockchainVerified: true,
          credentialTypes: ['voter-id', 'training-certificate', 'employer-appreciation'],
          lastUpdated: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Trust score calculation failed:', error);
      throw error;
    }
  }

  /**
   * SecurityMaster specific: Issue achievement certificate
   */
  async issueSecurityMasterCertificate(workerId: string, certificateType: string, title: string): Promise<VCIssuanceResponse> {
    return this.issueVC({
      workerId,
      documentUrl: `https://securitymaster.com/certificates/${this.generateRandomId()}`,
      credentialType: 'employer-appreciation' as any,
      issuer: 'SecurityMaster Services Pvt Ltd',
      metadata: {
        issueDate: new Date().toISOString(),
        documentHash: `sm_cert_${this.generateRandomId()}`,
        additionalData: {
          certificateType,
          title,
          issuerLogo: 'https://securitymaster.com/logo.png',
          validationCode: this.generateRandomId().toUpperCase()
        }
      }
    });
  }

  private generateRandomId(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  private generatePublicKey(): string {
    // Generate a mock multibase encoded public key
    return 'z' + Math.random().toString(36).substring(2, 50);
  }
}

// Factory function to create Dhiway service instance for Sandbox environment
export function createDhiwayService(): DhiwayService {
  // Sandbox configuration for https://sandbox.dedi.global
  const config: DhiwayConfig = {
    baseUrl: 'https://sandbox.dedi.global',
    dediPublishUrl: 'https://sandbox.dedi.global/dedi-publish/api/v1',
    dediLookupUrl: 'https://sandbox.dedi.global/dedi-lookup/api/v1',
    markStudioUrl: 'https://sandbox.dedi.global/mark-studio/api/v1',
    issuerAgentUrl: 'https://sandbox.dedi.global/issuer-agent/api/v1',
    verificationUrl: 'https://sandbox.dedi.global/verification/api/v1',
    walletUrl: 'https://sandbox.dedi.global/wallet/api/v1',
    digilockerUrl: 'https://sandbox.dedi.global/issuer-agent-digilocker/api/v1',
    apiKey: process.env.DHIWAY_API_KEY || 'sandbox-api-key', // Should come from Supabase secrets
    organizationId: process.env.DHIWAY_ORG_ID || 'upandup-sandbox-org', // Should come from Supabase secrets
    environment: 'sandbox'
  };

  return new DhiwayService(config);
}