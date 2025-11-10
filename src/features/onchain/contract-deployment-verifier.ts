'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface DeploymentVerification {
  address: string;
  bytecode: string;
  verified: boolean;
  wallet: string;
  timestamp: number;
}

export function useContractDeploymentVerifier() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [verifications, setVerifications] = useState<DeploymentVerification[]>([]);

  const verifyDeployment = async (contractAddress: string, bytecode: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Verify Deployment: ${contractAddress}`;
    await signMessageAsync({ message });
    
    const verification: DeploymentVerification = {
      address: contractAddress,
      bytecode,
      verified: true,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setVerifications([...verifications, verification]);
    return verification;
  };

  return { verifyDeployment, verifications, address };
}

