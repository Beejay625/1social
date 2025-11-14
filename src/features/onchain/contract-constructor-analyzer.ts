'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ConstructorAnalysis {
  contract: string;
  parameters: string[];
  required: boolean;
  wallet: string;
  timestamp: number;
}

export function useContractConstructorAnalyzer() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [analyses, setAnalyses] = useState<ConstructorAnalysis[]>([]);

  const analyzeConstructor = async (contract: string, parameters: string[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Analyze Constructor: ${contract}`;
    await signMessageAsync({ message });
    
    const analysis: ConstructorAnalysis = {
      contract,
      parameters,
      required: parameters.length > 0,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setAnalyses([...analyses, analysis]);
    return analysis;
  };

  return { analyzeConstructor, analyses, address };
}


