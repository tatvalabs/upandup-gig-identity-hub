
// CORD Blockchain Integration Types
// These interfaces define the structure for CORD SDK integration

export interface CORDWorkerDetails {
  name: string;
  address: string;
  phone: string;
  aadhar: string;
  employer: string;
}

export interface DIDCreationRequest {
  workerDetails: CORDWorkerDetails;
  metadata?: {
    employerId: string;
    partnershipId: string;
  };
}

export interface DIDCreationResponse {
  did: string;
  didDocument: {
    '@context': string[];
    id: string;
    verificationMethod: Array<{
      id: string;
      type: string;
      controller: string;
      publicKeyBase58?: string;
    }>;
    authentication: string[];
    assertionMethod: string[];
  };
  blockchainStatus: 'pending' | 'confirmed' | 'failed';
  transactionHash?: string;
  blockNumber?: number;
  createdAt: string;
}

export interface VCIssuanceRequest {
  workerId: string;
  documentUrl: string;
  credentialType: 'voter-id' | 'pan-card' | 'driving-license' | '10th-marksheet' | '12th-marksheet' | 'diploma' | 'degree' | 'skill-certificate' | 'employer-appreciation' | 'training-certificate';
  issuer: string;
  metadata: {
    issueDate: string;
    expiryDate?: string;
    documentHash: string;
    additionalData?: Record<string, any>;
  };
}

export interface VCIssuanceResponse {
  vcUrl: string;
  credentialId: string;
  verifiableCredential: {
    '@context': string[];
    id: string;
    type: string[];
    issuer: string;
    issuanceDate: string;
    expirationDate?: string;
    credentialSubject: {
      id: string;
      [key: string]: any;
    };
    proof: {
      type: string;
      created: string;
      verificationMethod: string;
      proofPurpose: string;
      jws: string;
    };
  };
  status: 'pending' | 'issued' | 'revoked' | 'expired';
  blockchainStatus: 'pending' | 'confirmed' | 'failed';
}

export interface TrustScoreData {
  totalCredentials: number;
  verifiedCredentials: number;
  employerVerified: boolean;
  blockchainVerified: boolean;
  credentialTypes: string[];
  lastUpdated: string;
}

export interface TrustScoreResponse {
  score: number;
  factors: {
    credentialCount: number;
    verificationRate: number;
    employerEndorsement: number;
    blockchainIntegrity: number;
    timeFactored: number;
  };
  breakdown: TrustScoreData;
}

export interface CORDSDKConfig {
  networkUrl: string;
  apiKey: string;
  did: string;
  privateKey: string;
}

export interface MarkStudioConfig {
  apiUrl: string;
  apiKey: string;
  organizationId: string;
}

// Error types for CORD operations
export interface CORDError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// Status tracking for blockchain operations
export interface BlockchainOperation {
  id: string;
  type: 'did_creation' | 'vc_issuance' | 'vc_revocation';
  status: 'pending' | 'processing' | 'confirmed' | 'failed';
  transactionHash?: string;
  blockNumber?: number;
  gasUsed?: number;
  error?: CORDError;
  createdAt: string;
  updatedAt: string;
}
