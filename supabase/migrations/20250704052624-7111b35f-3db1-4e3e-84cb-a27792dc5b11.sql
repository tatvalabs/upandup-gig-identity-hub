
-- Create partner management tables
CREATE TABLE public.partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  address TEXT,
  registration_number TEXT,
  partnership_status TEXT DEFAULT 'pending' CHECK (partnership_status IN ('pending', 'active', 'suspended', 'terminated')),
  onboarding_completed BOOLEAN DEFAULT false,
  cord_node_id TEXT, -- CORD issuance node identifier
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create partner users (administrators)
CREATE TABLE public.partner_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES public.partners(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'manager', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(partner_id, user_id)
);

-- Create partnership agreements
CREATE TABLE public.partnership_agreements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES public.partners(id) ON DELETE CASCADE,
  agreement_type TEXT NOT NULL,
  terms JSONB,
  signed_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'signed', 'expired', 'terminated')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workers table (gig workers)
CREATE TABLE public.workers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES public.partners(id) ON DELETE SET NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  did TEXT UNIQUE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT,
  aadhar_hash TEXT, -- Hashed Aadhar for privacy
  onboarding_status TEXT DEFAULT 'invited' CHECK (onboarding_status IN ('invited', 'registered', 'verified', 'active', 'suspended')),
  mobile_app_registered BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create worker credentials table
CREATE TABLE public.worker_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID REFERENCES public.workers(id) ON DELETE CASCADE,
  credential_type TEXT NOT NULL CHECK (credential_type IN ('government_id', 'education', 'skill', 'achievement', 'digilocker')),
  document_type TEXT NOT NULL, -- voter-id, pan-card, 10th-marksheet, etc.
  issuer_type TEXT NOT NULL CHECK (issuer_type IN ('digilocker', 'partner', 'upandup')),
  issuer_id UUID, -- Reference to partner if issued by partner
  vc_url TEXT,
  document_url TEXT,
  document_hash TEXT,
  verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'failed', 'expired')),
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB
);

-- Create verification requests table (DigiLocker integration)
CREATE TABLE public.verification_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID REFERENCES public.workers(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  digilocker_request_id TEXT,
  status TEXT DEFAULT 'initiated' CHECK (status IN ('initiated', 'pending', 'verified', 'failed', 'expired')),
  verification_data JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create trust scores table
CREATE TABLE public.trust_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  worker_id UUID REFERENCES public.workers(id) ON DELETE CASCADE,
  score INTEGER NOT NULL DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  factors JSONB NOT NULL, -- Breakdown of score components
  total_credentials INTEGER DEFAULT 0,
  verified_credentials INTEGER DEFAULT 0,
  government_verified BOOLEAN DEFAULT false,
  employer_verified BOOLEAN DEFAULT false,
  last_calculated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  version INTEGER DEFAULT 1,
  UNIQUE(worker_id, version)
);

-- Create employer certifications table (achievement certificates from partners)
CREATE TABLE public.employer_certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES public.partners(id) ON DELETE CASCADE,
  worker_id UUID REFERENCES public.workers(id) ON DELETE CASCADE,
  certificate_type TEXT NOT NULL CHECK (certificate_type IN ('skill', 'achievement', 'training', 'performance', 'safety')),
  title TEXT NOT NULL,
  description TEXT,
  vc_url TEXT,
  metadata JSONB,
  issued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partnership_agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worker_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trust_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employer_certifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for partners
CREATE POLICY "Partners can view their own data" ON public.partners
  FOR ALL USING (id IN (
    SELECT partner_id FROM public.partner_users WHERE user_id = auth.uid()
  ));

-- Create RLS policies for partner users
CREATE POLICY "Partner users can view their assignments" ON public.partner_users
  FOR ALL USING (user_id = auth.uid() OR partner_id IN (
    SELECT partner_id FROM public.partner_users WHERE user_id = auth.uid() AND role = 'admin'
  ));

-- Create RLS policies for workers
CREATE POLICY "Workers can view their own data" ON public.workers
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Partners can view their workers" ON public.workers
  FOR ALL USING (partner_id IN (
    SELECT partner_id FROM public.partner_users WHERE user_id = auth.uid()
  ));

-- Create RLS policies for worker credentials
CREATE POLICY "Workers can view their credentials" ON public.worker_credentials
  FOR ALL USING (worker_id IN (
    SELECT id FROM public.workers WHERE user_id = auth.uid()
  ));

CREATE POLICY "Partners can view their workers' credentials" ON public.worker_credentials
  FOR ALL USING (worker_id IN (
    SELECT w.id FROM public.workers w
    JOIN public.partner_users pu ON w.partner_id = pu.partner_id
    WHERE pu.user_id = auth.uid()
  ));

-- Create RLS policies for trust scores
CREATE POLICY "Workers can view their trust scores" ON public.trust_scores
  FOR ALL USING (worker_id IN (
    SELECT id FROM public.workers WHERE user_id = auth.uid()
  ));

CREATE POLICY "Partners can view their workers' trust scores" ON public.trust_scores
  FOR ALL USING (worker_id IN (
    SELECT w.id FROM public.workers w
    JOIN public.partner_users pu ON w.partner_id = pu.partner_id
    WHERE pu.user_id = auth.uid()
  ));

-- Create indexes for performance
CREATE INDEX idx_partners_status ON public.partners(partnership_status);
CREATE INDEX idx_workers_partner_id ON public.workers(partner_id);
CREATE INDEX idx_workers_onboarding_status ON public.workers(onboarding_status);
CREATE INDEX idx_worker_credentials_worker_id ON public.worker_credentials(worker_id);
CREATE INDEX idx_worker_credentials_type ON public.worker_credentials(credential_type, verification_status);
CREATE INDEX idx_trust_scores_worker_id ON public.trust_scores(worker_id);
CREATE INDEX idx_verification_requests_worker_id ON public.verification_requests(worker_id);
