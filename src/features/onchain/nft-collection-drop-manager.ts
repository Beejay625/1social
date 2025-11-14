'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface DropConfig {
  collectionAddress: string;
  dropName: string;
  maxSupply: number;
  mintPrice: bigint;
  startTime: number;
  endTime: number;
}

export function useNFTCollectionDropManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [creating, setCreating] = useState(false);
  const [dropping, setDropping] = useState(false);

  const { data: activeDrops } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getActiveDrops',
    args: [address],
  });

  const createDrop = async (config: DropConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setCreating(true);

    try {
      const message = `Create drop: ${config.dropName}`;
      await signMessageAsync({ message });

      await writeContract({
        address: config.collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'createDrop',
        args: [config.dropName, config.maxSupply, config.mintPrice, config.startTime, config.endTime],
      });
    } finally {
      setCreating(false);
    }
  };

  const executeDrop = async (dropId: number) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setDropping(true);

    try {
      const message = `Execute drop: ${dropId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'executeDrop',
        args: [dropId],
      });
    } finally {
      setDropping(false);
    }
  };

  return {
    createDrop,
    executeDrop,
    creating,
    dropping,
    address,
    isConnected,
    activeDrops,
  };
}

