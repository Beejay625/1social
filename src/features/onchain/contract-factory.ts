'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface FactoryDeployment {
  contractType: string;
  address: string;
  deployer: string;
  timestamp: number;
}

export function useContractFactory() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [deployments, setDeployments] = useState<FactoryDeployment[]>([]);

  const deployContract = async (contractType: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Deploy: ${contractType}`;
    await signMessageAsync({ message });
    
    const deployment: FactoryDeployment = {
      contractType,
      address: `0x${Date.now().toString(16)}`,
      deployer: address,
      timestamp: Date.now(),
    };
    
    setDeployments([...deployments, deployment]);
    return deployment;
  };

  return { deployContract, deployments, address };
}

