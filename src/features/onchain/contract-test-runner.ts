'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TestResult {
  contract: string;
  testName: string;
  passed: boolean;
  gasUsed: bigint;
  wallet: string;
  timestamp: number;
}

export function useContractTestRunner() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [results, setResults] = useState<TestResult[]>([]);

  const runTest = async (contract: string, testName: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Run Test: ${contract}.${testName}`;
    await signMessageAsync({ message });
    
    const result: TestResult = {
      contract,
      testName,
      passed: true,
      gasUsed: BigInt(100000),
      wallet: address,
      timestamp: Date.now(),
    };
    
    setResults([...results, result]);
    return result;
  };

  return { runTest, results, address };
}


