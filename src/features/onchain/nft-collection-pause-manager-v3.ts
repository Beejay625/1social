'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export function useNFTCollectionPauseManagerV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [pausing, setPausing] = useState(false);

  const { data: isPaused } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'paused',
    query: { enabled: isConnected },
  });

  const pause = async (collectionAddress: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setPausing(true);

    try {
      const message = `Pause NFT collection`;
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

  const unpause = async (collectionAddress: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setPausing(true);

    try {
      const message = `Unpause NFT collection`;
      await signMessageAsync({ message });

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
    pause,
    unpause,
    pausing,
    address,
    isConnected,
    isPaused: isPaused as boolean,
  };
}

