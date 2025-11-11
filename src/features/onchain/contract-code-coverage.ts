'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface CodeCoverage {
  contract: string;
  coverage: number;
  lines: number;
  covered: number;
  wallet: string;
  timestamp: number;
}

export function useContractCodeCoverage() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [coverages, setCoverages] = useState<CodeCoverage[]>([]);

  const calculateCoverage = async (contract: string, lines: number, covered: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Calculate Code Coverage: ${contract}`;
    await signMessageAsync({ message });
    
    const coverage: CodeCoverage = {
      contract,
      coverage: (covered / lines) * 100,
      lines,
      covered,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setCoverages([...coverages, coverage]);
    return coverage;
  };

  return { calculateCoverage, coverages, address };
}

