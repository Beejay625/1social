'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface RoyaltyUpdate {
  id: string;
  tokenId: string;
  collection: string;
  recipient: string;
  percentage: number;
  updated: boolean;
}

export function useNFTRoyaltyUpdater() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [updates, setUpdates] = useState<RoyaltyUpdate[]>([]);

  const updateRoyalty = async (collection: string, tokenId: string, recipient: string, percentage: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: collection as `0x${string}`,
      abi: [],
      functionName: 'setRoyalty',
      args: [BigInt(tokenId), recipient, percentage * 100],
    });

    const update: RoyaltyUpdate = {
      id: txHash || '',
      tokenId,
      collection,
      recipient,
      percentage,
      updated: true,
    };

    setUpdates([...updates, update]);
    return txHash;
  };

  return { updateRoyalty, updates, address };
}


