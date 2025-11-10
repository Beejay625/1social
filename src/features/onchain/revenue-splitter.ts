'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RevenueSplit {
  recipient: string;
  percentage: number;
  amount: string;
}

export function useRevenueSplitter() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [splits, setSplits] = useState<RevenueSplit[]>([]);

  const createSplit = async (recipient: string, percentage: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Split: ${recipient} ${percentage}%`;
    await signMessageAsync({ message });
    
    const split: RevenueSplit = {
      recipient,
      percentage,
      amount: '0',
    };
    
    setSplits([...splits, split]);
    return split;
  };

  return { createSplit, splits, address };
}
