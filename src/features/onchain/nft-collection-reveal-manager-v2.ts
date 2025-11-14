'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RevealConfig {
  revealType: 'instant' | 'scheduled' | 'progressive';
  revealTime?: number;
  revealPercentage?: number;
}

export function useNFTCollectionRevealManagerV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [revealing, setRevealing] = useState(false);
  const [scheduling, setScheduling] = useState(false);

  const { data: revealStatus } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'revealStatus',
  });

  const scheduleReveal = async (collectionAddress: string, config: RevealConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setScheduling(true);

    try {
      const message = `Schedule reveal: ${config.revealType}`;
      await signMessageAsync({ message });

      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'scheduleReveal',
        args: [
          config.revealType === 'scheduled' ? 1 : config.revealType === 'progressive' ? 2 : 0,
          config.revealTime || 0,
          config.revealPercentage || 0,
        ],
      });
    } finally {
      setScheduling(false);
    }
  };

  const executeReveal = async (collectionAddress: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setRevealing(true);

    try {
      const message = 'Execute collection reveal';
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
    scheduling,
    address,
    isConnected,
    revealStatus,
  };
}

