'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Comparison {
  contract1: string;
  contract2: string;
  differences: string[];
  similar: boolean;
  wallet: string;
  timestamp: number;
}

export function useContractComparator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [comparisons, setComparisons] = useState<Comparison[]>([]);

  const compareContracts = async (contract1: string, contract2: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Compare: ${contract1} vs ${contract2}`;
    await signMessageAsync({ message });
    
    const comparison: Comparison = {
      contract1,
      contract2,
      differences: [],
      similar: true,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setComparisons([...comparisons, comparison]);
    return comparison;
  };

  return { compareContracts, comparisons, address };
}

