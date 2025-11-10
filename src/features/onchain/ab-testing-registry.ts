'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface ABTest {
  id: string;
  variantA: string;
  variantB: string;
  results: {
    variantAViews: number;
    variantBViews: number;
  };
}

export function useABTestingRegistry() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const [tests, setTests] = useState<ABTest[]>([]);

  const createTest = async (variantA: string, variantB: string) => {
    if (!isConnected || !address) {
      throw new Error('Reown wallet not connected');
    }

    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'createTest',
      args: [variantA, variantB],
    });

    const test: ABTest = {
      id: txHash || '',
      variantA,
      variantB,
      results: { variantAViews: 0, variantBViews: 0 },
    };

    setTests([...tests, test]);
    return txHash;
  };

  return { createTest, tests, isConnected, address };
}
