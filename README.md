# UpandUp SSI/VC Identity Hub

## Overview

UpandUp is a blockchain-based identity and credential management platform for gig workers, built on the Dhiway blockchain network. This system enables security service providers and gig platforms to onboard workers with permanent, verifiable digital identities and credentials.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Dhiway API credentials

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd upandup-gig-identity-hub

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

## 🏗️ Architecture

### Technology Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Shadcn/UI
- **Backend**: Supabase (PostgreSQL, Edge Functions, Storage)
- **Blockchain**: Dhiway Network (DEDI, Mark Studio, Issuer Agent)
- **Authentication**: Supabase Auth
- **State Management**: React Query

### Dhiway Integration

The platform integrates with Dhiway's complete blockchain infrastructure:

#### Sandbox Environment
- **Base URL**: `https://sandbox.dedi.global`
- **DEDI Publish**: DID creation and anchoring
- **DEDI Lookup**: DID resolution and verification
- **Mark Studio**: Credential schema management
- **Issuer Agent**: Verifiable credential issuance
- **DigiLocker Integration**: Government document verification
- **Verification Middleware**: Credential verification
- **Wallet APIs**: Digital identity storage

## 📋 SecurityMaster Case Study

### Business Challenge
SecurityMaster Services Pvt Ltd manages 1000+ security guards across Delhi NCR, facing challenges with:
- Manual document verification (2-3 days)
- Fake document submissions
- Client trust and verification issues
- No standardized skill assessment
- Worker motivation and retention

### UpandUp Solution
- **Instant DigiLocker verification**
- **Blockchain-secured credentials**
- **QR code instant verification**
- **Dynamic trust scoring system**
- **Achievement-based motivation**

### Implementation Results
- 90% reduction in document verification time
- 100% document authenticity guarantee
- Enhanced client trust and confidence
- Improved worker retention and motivation
- Competitive advantage in security industry

## 🔧 API Integration

### Core Endpoints

#### Partner Registration
```typescript
POST /api/partners/register
{
  "name": "SecurityMaster Services Pvt Ltd",
  "email": "admin@securitymaster.com",
  "phone": "+91-124-4567890",
  "registrationNumber": "U74999DL2015PTC123456"
}
```

#### Batch Worker Invitation
```typescript
POST /api/workers/batch-invite
{
  "partnerId": "uuid-partner-id",
  "workers": [
    {
      "name": "Rajesh Kumar",
      "phone": "+91-9876543210",
      "employeeId": "SM001"
    }
  ]
}
```

#### DigiLocker Verification
```typescript
POST /api/credentials/verify-digilocker
{
  "workerId": "uuid-worker-id",
  "documentType": "voter-id",
  "aadhaarNumber": "xxxx-xxxx-1234",
  "consent": true
}
```

### Dhiway Service Configuration

```typescript
const dhiwayConfig = {
  baseUrl: 'https://sandbox.dedi.global',
  dediPublishUrl: 'https://sandbox.dedi.global/dedi-publish/api/v1',
  dediLookupUrl: 'https://sandbox.dedi.global/dedi-lookup/api/v1',
  markStudioUrl: 'https://sandbox.dedi.global/mark-studio/api/v1',
  issuerAgentUrl: 'https://sandbox.dedi.global/issuer-agent/api/v1',
  verificationUrl: 'https://sandbox.dedi.global/verification/api/v1',
  walletUrl: 'https://sandbox.dedi.global/wallet/api/v1',
  digilockerUrl: 'https://sandbox.dedi.global/issuer-agent-digilocker/api/v1',
  apiKey: process.env.DHIWAY_API_KEY,
  organizationId: process.env.DHIWAY_ORG_ID,
  environment: 'sandbox'
};
```

## 📱 Mobile App Features

### Worker Mobile App
- **Digital Identity Wallet**: Secure credential storage
- **QR Code Sharing**: Instant verification
- **Trust Score Display**: Gamified reputation system
- **Achievement Gallery**: Professional portfolio

### Verification Workflow
1. **Upload**: Worker uploads document via mobile app
2. **Verify**: DigiLocker API validates document
3. **Issue VC**: Mark Studio creates verifiable credential
4. **Anchor**: Credential anchored on Dhiway network

## 🔐 Security Features

### Data Protection
- PII encryption at rest
- Secure document storage
- Audit logging
- GDPR compliance

### Blockchain Security
- Private key management
- Transaction signing
- Network security
- Recovery mechanisms

## 📊 Trust Score Algorithm

The trust score (0-100) is calculated based on:
- **Credential Count** (25%): Number of verified credentials
- **Verification Rate** (30%): Percentage of verified vs total credentials
- **Employer Endorsement** (20%): SecurityMaster achievement certificates
- **Blockchain Integrity** (15%): Verification on Dhiway network
- **Time Factor** (10%): Account age and activity

## 🚀 Deployment

### Environment Variables
```bash
# Dhiway Configuration
DHIWAY_API_KEY=your_dhiway_api_key
DHIWAY_ORG_ID=your_organization_id
DHIWAY_BASE_URL=https://sandbox.dedi.global

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Security
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_encryption_key
```

### Production Deployment
1. Update endpoints from sandbox to production
2. Configure SSL certificates and security headers
3. Set up monitoring and logging infrastructure
4. Implement backup and disaster recovery
5. Complete security audit and penetration testing

## 📖 Documentation

### Available Pages
- **Home**: Platform overview and SecurityMaster case study
- **SecurityMaster Documentation**: Complete integration guide
- **Partner Onboarding**: Registration workflow
- **Partner Dashboard**: Worker management interface
- **Technical Documentation**: API reference and architecture

### Live Demo
Visit `/securitymaster` for a comprehensive demonstration of:
- Partner registration and DID creation
- Batch worker onboarding
- Document verification workflow
- Trust score calculation
- Achievement certificate issuance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For technical support and integration assistance:
- Email: support@upandup.com
- Documentation: [View Complete Docs](/documentation)
- SecurityMaster Guide: [View Case Study](/securitymaster)

## 🔗 Links

- [Dhiway Documentation](https://docs.dhiway.com)
- [Supabase Documentation](https://supabase.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)