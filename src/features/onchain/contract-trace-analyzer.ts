'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TraceAnalysis {
  txHash: string;
  calls: number;
  depth: number;
  gasUsed: bigint;
  wallet: string;
  timestamp: number;
}

export function useContractTraceAnalyzer() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [analyses, setAnalyses] = useState<TraceAnalysis[]>([]);

  const analyzeTrace = async (txHash: string, calls: number, depth: number, gasUsed: bigint) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Analyze Trace: ${txHash}`;
    await signMessageAsync({ message });
    
    const analysis: TraceAnalysis = {
      txHash,
      calls,
      depth,
      gasUsed,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setAnalyses([...analyses, analysis]);
    return analysis;
  };

  return { analyzeTrace, analyses, address };
}

