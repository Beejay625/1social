'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface LogAnalysis {
  contract: string;
  logs: any[];
  topics: string[];
  wallet: string;
  timestamp: number;
}

export function useContractLogAnalyzer() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [analyses, setAnalyses] = useState<LogAnalysis[]>([]);

  const analyzeLogs = async (contract: string, logs: any[], topics: string[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Analyze Logs: ${contract}`;
    await signMessageAsync({ message });
    
    const analysis: LogAnalysis = {
      contract,
      logs,
      topics,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setAnalyses([...analyses, analysis]);
    return analysis;
  };

  return { analyzeLogs, analyses, address };
}

