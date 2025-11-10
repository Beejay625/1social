'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface DeployedContract {
  address: string;
  type: string;
  deployer: string;
  timestamp: number;
}

export function useSmartContractDeployer() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [contracts, setContracts] = useState<DeployedContract[]>([]);

  const deployContract = async (type: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Deploy: ${type}`;
    await signMessageAsync({ message });
    
    const contract: DeployedContract = {
      address: `0x${Date.now().toString(16)}`,
      type,
      deployer: address,
      timestamp: Date.now(),
    };
    
    setContracts([...contracts, contract]);
    return contract;
  };

  return { deployContract, contracts, address };
}
