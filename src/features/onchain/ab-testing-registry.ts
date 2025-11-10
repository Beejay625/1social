'use client';

import { useAccount } from 'wagmi';
import { useState } from 'react';

export interface ABTest {
  id: string;
  variantA: string;
  variantB: string;
  results: Record<string, number>;
}

export function useABTestingRegistry() {
  const { address } = useAccount();
  const [tests, setTests] = useState<ABTest[]>([]);

  const createTest = async (variantA: string, variantB: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const test: ABTest = {
      id: `test_${Date.now()}`,
      variantA,
      variantB,
      results: {},
    };
    
    setTests([...tests, test]);
    return test;
  };

  return { createTest, tests, address };
}
