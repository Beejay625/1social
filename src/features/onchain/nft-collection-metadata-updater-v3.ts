'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface MetadataUpdate {
  tokenId: bigint;
  newURI: string;
}

export function useNFTCollectionMetadataUpdaterV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [updating, setUpdating] = useState(false);

  const { data: tokenURI } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'tokenURI',
    args: [BigInt(0)],
  });

  const { data: isOwner } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'ownerOf',
    args: [BigInt(0)],
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
        functionName: 'setTokenURI',
        args: [update.tokenId, update.newURI],
      });
    } finally {
      setUpdating(false);
    }
  };

  return {
    updateMetadata,
    updating,
    address,
    isConnected,
    tokenURI,
    isOwner: address?.toLowerCase() === (isOwner as string)?.toLowerCase(),
  };
}

