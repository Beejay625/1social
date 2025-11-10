'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface RevenueSplit {
  recipient: string;
  percentage: number;
}

export function useCreatorRevenueSplitter() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [splits, setSplits] = useState<RevenueSplit[]>([]);

  const configureSplit = async (splits: RevenueSplit[]) => {
    if (!address) throw new Error('Wallet not connected');
    
    const total = splits.reduce((sum, s) => sum + s.percentage, 0);
    if (total !== 100) throw new Error('Splits must total 100%');
    
    setSplits(splits);
    return { splits, configuredBy: address };
  };

  return { configureSplit, splits };
}

