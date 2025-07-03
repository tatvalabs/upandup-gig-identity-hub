
// React hooks for CORD blockchain operations

import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { createCORDService } from '@/services/cordService';
import { 
  DIDCreationRequest, 
  DIDCreationResponse,
  VCIssuanceRequest,
  VCIssuanceResponse,
  TrustScoreResponse
} from '@/types/cord';

export function useDIDCreation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const cordService = createCORDService();

  const createDID = useCallback(async (request: DIDCreationRequest): Promise<DIDCreationResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await cordService.createDID(request);
      
      toast({
        title: "DID Creation Initiated",
        description: "Your digital identity is being created on CORD blockchain",
      });

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create DID';
      setError(errorMessage);
      
      toast({
        title: "DID Creation Failed",
        description: errorMessage,
        variant: "destructive",
      });

      return null;
    } finally {
      setIsLoading(false);
    }
  }, [cordService, toast]);

  return {
    createDID,
    isLoading,
    error
  };
}

export function useVCIssuance() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const cordService = createCORDService();

  const issueVC = useCallback(async (request: VCIssuanceRequest): Promise<VCIssuanceResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await cordService.issueVC(request);
      
      toast({
        title: "Credential Issued",
        description: "Your verifiable credential has been created successfully",
      });

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to issue VC';
      setError(errorMessage);
      
      toast({
        title: "Credential Issuance Failed",
        description: errorMessage,
        variant: "destructive",
      });

      return null;
    } finally {
      setIsLoading(false);
    }
  }, [cordService, toast]);

  return {
    issueVC,
    isLoading,
    error
  };
}

export function useTrustScore() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cordService = createCORDService();

  const calculateTrustScore = useCallback(async (workerId: string): Promise<TrustScoreResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await cordService.calculateTrustScore(workerId);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to calculate trust score';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [cordService]);

  return {
    calculateTrustScore,
    isLoading,
    error
  };
}

export function useCORDVerification() {
  const [isLoading, setIsLoading] = useState(false);
  const cordService = createCORDService();

  const verifyDID = useCallback(async (did: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      return await cordService.verifyDID(did);
    } catch (err) {
      console.error('DID verification failed:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [cordService]);

  const verifyVC = useCallback(async (vcUrl: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      return await cordService.verifyVC(vcUrl);
    } catch (err) {
      console.error('VC verification failed:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [cordService]);

  return {
    verifyDID,
    verifyVC,
    isLoading
  };
}
