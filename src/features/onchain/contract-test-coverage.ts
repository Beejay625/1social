'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TestCoverage {
  contract: string;
  coverage: number;
  functions: number;
  tested: number;
  wallet: string;
  timestamp: number;
}

export function useContractTestCoverage() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [coverages, setCoverages] = useState<TestCoverage[]>([]);

  const calculateCoverage = async (contract: string, functions: number, tested: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Calculate Coverage: ${contract}`;
    await signMessageAsync({ message });
    
    const coverage: TestCoverage = {
      contract,
      coverage: (tested / functions) * 100,
      functions,
      tested,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setCoverages([...coverages, coverage]);
    return coverage;
  };

  return { calculateCoverage, coverages, address };
}


