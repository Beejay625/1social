'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface MetadataUpdate {
  tokenId: bigint;
  name?: string;
  description?: string;
  image?: string;
  attributes?: Array<{ trait_type: string; value: string }>;
}

export function useNFTCollectionMetadataManagerV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [updating, setUpdating] = useState(false);
  const [freezing, setFreezing] = useState(false);

  const { data: isOwner } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'owner',
  });

  const updateMetadata = async (collectionAddress: string, update: MetadataUpdate) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setUpdating(true);

    try {
      const message = `Update metadata for token ${update.tokenId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'updateTokenMetadata',
        args: [update.tokenId, JSON.stringify(update)],
      });
    } finally {
      setUpdating(false);
    }
  };

  const freezeMetadata = async (collectionAddress: string, tokenId: bigint) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setFreezing(true);

    try {
      const message = `Freeze metadata for token ${tokenId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'freezeTokenMetadata',
        args: [tokenId],
      });
    } finally {
      setFreezing(false);
    }
  };

  return {
    updateMetadata,
    freezeMetadata,
    updating,
    freezing,
    address,
    isConnected,
    isOwner: address?.toLowerCase() === isOwner?.toString().toLowerCase(),
  };
}

