'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export function useNFTCollectionPauserV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [pausing, setPausing] = useState(false);

  const { data: isPaused } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'paused',
  });

  const pauseCollection = async (collectionAddress: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setPausing(true);

    try {
      const message = `Pause collection`;
      await signMessageAsync({ message });

      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'pause',
        args: [],
      });
    } finally {
      setPausing(false);
    }
  };

  const unpauseCollection = async (collectionAddress: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setPausing(true);

    try {
      await signMessageAsync({ message: 'Unpause collection' });
      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'unpause',
        args: [],
      });
    } finally {
      setPausing(false);
    }
  };

  return {
    pauseCollection,
    unpauseCollection,
    pausing,
    address,
    isConnected,
    isPaused,
  };
}

