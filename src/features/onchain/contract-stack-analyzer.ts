'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface StackAnalysis {
  contract: string;
  maxDepth: number;
  operations: number;
  wallet: string;
  timestamp: number;
}

export function useContractStackAnalyzer() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [analyses, setAnalyses] = useState<StackAnalysis[]>([]);

  const analyzeStack = async (contract: string, maxDepth: number, operations: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Analyze Stack: ${contract}`;
    await signMessageAsync({ message });
    
    const analysis: StackAnalysis = {
      contract,
      maxDepth,
      operations,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setAnalyses([...analyses, analysis]);
    return analysis;
  };

  return { analyzeStack, analyses, address };
}

