
// React hooks for Dhiway blockchain operations

import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { createDhiwayService } from '@/services/dhiwayService';
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
  const dhiwayService = createDhiwayService();

  const createDID = useCallback(async (request: DIDCreationRequest): Promise<DIDCreationResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await dhiwayService.createDID(request);
      
      toast({
        title: "DID Creation Initiated",
        description: "Your digital identity is being created on Dhiway network",
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
  }, [dhiwayService, toast]);

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
  const dhiwayService = createDhiwayService();

  const issueVC = useCallback(async (request: VCIssuanceRequest): Promise<VCIssuanceResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await dhiwayService.issueVC(request);
      
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
  }, [dhiwayService, toast]);

  return {
    issueVC,
    isLoading,
    error
  };
}

export function useTrustScore() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dhiwayService = createDhiwayService();

  const calculateTrustScore = useCallback(async (workerId: string): Promise<TrustScoreResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await dhiwayService.calculateTrustScore(workerId);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to calculate trust score';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [dhiwayService]);

  return {
    calculateTrustScore,
    isLoading,
    error
  };
}

export function useDhiwayVerification() {
  const [isLoading, setIsLoading] = useState(false);
  const dhiwayService = createDhiwayService();

  const verifyDID = useCallback(async (did: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      return await dhiwayService.verifyDID(did);
    } catch (err) {
      console.error('DID verification failed:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [dhiwayService]);

  const verifyVC = useCallback(async (vcUrl: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      return await dhiwayService.verifyVC(vcUrl);
    } catch (err) {
      console.error('VC verification failed:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [dhiwayService]);

  const verifyWithDigiLocker = useCallback(async (documentType: string, aadhaarNumber?: string): Promise<any> => {
    setIsLoading(true);
    try {
      return await dhiwayService.verifyWithDigiLocker(documentType, aadhaarNumber);
    } catch (err) {
      console.error('DigiLocker verification failed:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [dhiwayService]);

  const createWallet = useCallback(async (workerId: string): Promise<any> => {
    setIsLoading(true);
    try {
      return await dhiwayService.createWallet(workerId);
    } catch (err) {
      console.error('Wallet creation failed:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [dhiwayService]);

  return {
    verifyDID,
    verifyVC,
    verifyWithDigiLocker,
    createWallet,
    isLoading
  };
}
