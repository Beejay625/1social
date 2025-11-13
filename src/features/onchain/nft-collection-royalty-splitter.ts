'use client';

import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

/**
 * Royalty split configuration
 */
export interface RoyaltySplit {
  collectionAddress: string;
  recipients: string[];
  percentages: number[];
  splitId: string;
}

/**
 * Hook for splitting NFT collection royalties with Reown wallet integration
 * Distributes royalties among multiple recipients with percentage-based allocation
 */
export function useNFTCollectionRoyaltySplitter() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [splits, setSplits] = useState<RoyaltySplit[]>([]);

  const createSplit = async (collectionAddress: string, recipients: string[], percentages: number[]) => {
    if (!address || !isConnected) throw new Error('Reown wallet not connected');
    
    const total = percentages.reduce((sum, p) => sum + p, 0);
    if (total !== 100) throw new Error('Percentages must sum to 100');
    
    const message = `Create royalty split for ${collectionAddress} with ${recipients.length} recipients`;
    await signMessageAsync({ message });
    
    const split: RoyaltySplit = {
      collectionAddress,
      recipients,
      percentages,
      splitId: `split_${Date.now()}`,
    };
    
    setSplits([...splits, split]);
    return split;
  };

  return { 
    createSplit, 
    splits, 
    address, 
    isConnected,
    hash,
    isPending,
    isConfirming,
    isConfirmed
  };
}

