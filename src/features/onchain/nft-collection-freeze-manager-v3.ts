'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface FreezeConfig {
  collectionAddress: string;
  freezeType: 'metadata' | 'transfers' | 'all';
  duration?: number;
}

export function useNFTCollectionFreezeManagerV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [freezing, setFreezing] = useState(false);

  const { data: isOwner } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'owner',
  });

  const { data: isFrozen } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'isFrozen',
  });

  const freeze = async (config: FreezeConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    if (address?.toLowerCase() !== (isOwner as string)?.toLowerCase()) {
      throw new Error('Only owner can freeze');
    }
    setFreezing(true);

    try {
      const message = `Freeze collection: ${config.freezeType}`;
      await signMessageAsync({ message });

      if (config.freezeType === 'metadata') {
        await writeContract({
          address: config.collectionAddress as `0x${string}`,
          abi: [],
          functionName: 'freezeMetadata',
          args: [],
        });
      } else if (config.freezeType === 'transfers') {
        await writeContract({
          address: config.collectionAddress as `0x${string}`,
          abi: [],
          functionName: 'freezeTransfers',
          args: [config.duration || 0],
        });
      } else {
        await writeContract({
          address: config.collectionAddress as `0x${string}`,
          abi: [],
          functionName: 'freezeAll',
          args: [config.duration || 0],
        });
      }
    } finally {
      setFreezing(false);
    }
  };

  const unfreeze = async (collectionAddress: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setFreezing(true);

    try {
      const message = 'Unfreeze collection';
      await signMessageAsync({ message });

      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'unfreeze',
        args: [],
      });
    } finally {
      setFreezing(false);
    }
  };

  return {
    freeze,
    unfreeze,
    freezing,
    address,
    isConnected,
    isOwner: address?.toLowerCase() === (isOwner as string)?.toLowerCase(),
    isFrozen,
  };
}
