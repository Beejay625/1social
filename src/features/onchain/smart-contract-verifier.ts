'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface VerificationResult {
  address: string;
  verified: boolean;
  compiler: string;
  timestamp: number;
}

export function useSmartContractVerifier() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [verifications, setVerifications] = useState<VerificationResult[]>([]);

  const verifyContract = async (contractAddress: string, compiler: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Verify Contract: ${contractAddress}`;
    await signMessageAsync({ message });
    
    const result: VerificationResult = {
      address: contractAddress,
      verified: true,
      compiler,
      timestamp: Date.now(),
    };
    
    setVerifications([...verifications, result]);
    return result;
  };

  return { verifyContract, verifications, address };
}

