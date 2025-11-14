'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface MemoryAnalysis {
  contract: string;
  maxMemory: number;
  allocations: number;
  wallet: string;
  timestamp: number;
}

export function useContractMemoryAnalyzer() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [analyses, setAnalyses] = useState<MemoryAnalysis[]>([]);

  const analyzeMemory = async (contract: string, maxMemory: number, allocations: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Analyze Memory: ${contract}`;
    await signMessageAsync({ message });
    
    const analysis: MemoryAnalysis = {
      contract,
      maxMemory,
      allocations,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setAnalyses([...analyses, analysis]);
    return analysis;
  };

  return { analyzeMemory, analyses, address };
}


