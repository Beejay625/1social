'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface DeploymentVerification {
  contract: string;
  verified: boolean;
  compiler: string;
  wallet: string;
  timestamp: number;
}

export function useContractDeploymentVerifier() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [verifications, setVerifications] = useState<DeploymentVerification[]>([]);

  const verifyDeployment = async (contract: string, compiler: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Verify Deployment: ${contract}`;
    await signMessageAsync({ message });
    
    const verification: DeploymentVerification = {
      contract,
      verified: true,
      compiler,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setVerifications([...verifications, verification]);
    return verification;
  };

  return { verifyDeployment, verifications, address };
}
