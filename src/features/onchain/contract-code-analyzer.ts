'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface CodeAnalysis {
  contract: string;
  complexity: number;
  lines: number;
  functions: number;
  issues: string[];
  wallet: string;
  timestamp: number;
}

export function useContractCodeAnalyzer() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [analyses, setAnalyses] = useState<CodeAnalysis[]>([]);

  const analyzeCode = async (contract: string, code: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Analyze Code: ${contract}`;
    await signMessageAsync({ message });
    
    const analysis: CodeAnalysis = {
      contract,
      complexity: 10,
      lines: code.split('\n').length,
      functions: 5,
      issues: [],
      wallet: address,
      timestamp: Date.now(),
    };
    
    setAnalyses([...analyses, analysis]);
    return analysis;
  };

  return { analyzeCode, analyses, address };
}

