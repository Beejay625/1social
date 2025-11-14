'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export function useNFTCollectionRevealManagerV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [revealing, setRevealing] = useState(false);

  const scheduleReveal = async (collectionAddress: string, revealTime: number) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setRevealing(true);

    try {
      const message = `Schedule collection reveal at ${new Date(revealTime).toISOString()}`;
      await signMessageAsync({ message });

      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'scheduleReveal',
        args: [revealTime],
      });
    } finally {
      setRevealing(false);
    }
  };

  const executeReveal = async (collectionAddress: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setRevealing(true);

    try {
      const message = `Execute collection reveal`;
      await signMessageAsync({ message });

      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'reveal',
        args: [],
      });
    } finally {
      setRevealing(false);
    }
  };

  return {
    scheduleReveal,
    executeReveal,
    revealing,
    address,
    isConnected,
  };
}

