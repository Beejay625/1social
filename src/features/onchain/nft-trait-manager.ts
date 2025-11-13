'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface TraitUpdate {
  id: string;
  tokenId: string;
  collection: string;
  traits: Record<string, string>;
  updated: boolean;
}

export function useNFTTraitManager() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [updates, setUpdates] = useState<TraitUpdate[]>([]);

  const updateTraits = async (collection: string, tokenId: string, traits: Record<string, string>) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: collection as `0x${string}`,
      abi: [],
      functionName: 'updateTraits',
      args: [BigInt(tokenId), JSON.stringify(traits)],
    });

    const update: TraitUpdate = {
      id: txHash || '',
      tokenId,
      collection,
      traits,
      updated: true,
    };

    setUpdates([...updates, update]);
    return txHash;
  };

  return { updateTraits, updates, address };
}


