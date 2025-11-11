'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Complexity {
  contract: string;
  cyclomatic: number;
  cognitive: number;
  wallet: string;
  timestamp: number;
}

export function useContractComplexityAnalyzer() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [complexities, setComplexities] = useState<Complexity[]>([]);

  const analyzeComplexity = async (contract: string, cyclomatic: number, cognitive: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Analyze Complexity: ${contract}`;
    await signMessageAsync({ message });
    
    const complexity: Complexity = {
      contract,
      cyclomatic,
      cognitive,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setComplexities([...complexities, complexity]);
    return complexity;
  };

  return { analyzeComplexity, complexities, address };
}

