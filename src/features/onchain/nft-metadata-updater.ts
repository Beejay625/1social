'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface MetadataUpdate {
  id: string;
  tokenId: string;
  collection: string;
  metadataURI: string;
  updated: boolean;
}

export function useNFTMetadataUpdater() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [updates, setUpdates] = useState<MetadataUpdate[]>([]);

  const updateMetadata = async (collection: string, tokenId: string, metadataURI: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: collection as `0x${string}`,
      abi: [],
      functionName: 'setTokenURI',
      args: [BigInt(tokenId), metadataURI],
    });

    const update: MetadataUpdate = {
      id: txHash || '',
      tokenId,
      collection,
      metadataURI,
      updated: true,
    };

    setUpdates([...updates, update]);
    return txHash;
  };

  return { updateMetadata, updates, address };
}


