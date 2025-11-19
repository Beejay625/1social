'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface CollectionMerge {
  sourceCollections: string[];
  targetCollection: string;
  mergeType: 'transfer' | 'burn';
}

export function useNFTCollectionMerger() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [merging, setMerging] = useState(false);

  const mergeCollections = async (merge: CollectionMerge) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setMerging(true);

    try {
      const message = `Merge ${merge.sourceCollections.length} collections`;
      await signMessageAsync({ message });

      await writeContract({
        address: merge.targetCollection as `0x${string}`,
        abi: [],
        functionName: 'mergeCollections',
        args: [merge.sourceCollections, merge.mergeType === 'burn'],
      });
    } finally {
      setMerging(false);
    }
  };

  return {
    mergeCollections,
    merging,
    address,
    isConnected,
  };
}

