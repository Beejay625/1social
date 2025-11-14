'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RoyaltySplit {
  recipients: string[];
  percentages: number[];
}

export function useNFTCollectionRoyaltySplitManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);

  const { data: currentSplits } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getRoyaltySplits',
    args: [address],
  });

  const setRoyaltySplits = async (collectionAddress: string, split: RoyaltySplit) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const totalPercentage = split.percentages.reduce((sum, p) => sum + p, 0);
      if (totalPercentage !== 100) {
        throw new Error('Percentages must sum to 100');
      }

      const message = `Set royalty splits for ${split.recipients.length} recipients`;
      await signMessageAsync({ message });

      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'setRoyaltySplits',
        args: [split.recipients, split.percentages],
      });
    } finally {
      setManaging(false);
    }
  };

  return {
    setRoyaltySplits,
    managing,
    address,
    isConnected,
    currentSplits,
  };
}

