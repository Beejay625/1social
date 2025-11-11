'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Dependency {
  contract: string;
  dependsOn: string[];
  level: number;
  wallet: string;
  timestamp: number;
}

export function useContractDependencyGraph() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [dependencies, setDependencies] = useState<Dependency[]>([]);

  const addDependency = async (contract: string, dependsOn: string[], level: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Add Dependency: ${contract}`;
    await signMessageAsync({ message });
    
    const dependency: Dependency = {
      contract,
      dependsOn,
      level,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setDependencies([...dependencies, dependency]);
    return dependency;
  };

  return { addDependency, dependencies, address };
}

