'use client';

/**
 * NFT Collection Reveal Manager
 * Manage NFT collection reveals with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Reveal {
  revealId: string;
  collectionAddress: string;
  revealTime: number;
  baseUri: string;
  revealedBy: string;
  timestamp: number;
}

export function useNFTCollectionRevealManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [reveals, setReveals] = useState<Reveal[]>([]);

  const scheduleReveal = async (
    collectionAddress: string,
    revealTime: number,
    baseUri: string
  ): Promise<Reveal> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (revealTime <= Date.now()) {
      throw new Error('Reveal time must be in the future');
    }
    
    const message = `Schedule reveal: ${collectionAddress} at ${new Date(revealTime).toISOString()}`;
    await signMessageAsync({ message });
    
    const reveal: Reveal = {
      revealId: `reveal-${Date.now()}`,
      collectionAddress,
      revealTime,
      baseUri,
      revealedBy: address,
      timestamp: Date.now(),
    };
    
    setReveals([...reveals, reveal]);
    return reveal;
  };

  return { scheduleReveal, reveals, address };
}
