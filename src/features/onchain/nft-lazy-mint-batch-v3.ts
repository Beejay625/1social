'use client';

/**
 * NFT Lazy Mint Batch V3
 * Lazy mint multiple NFTs in batch with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface LazyMintBatch {
  batchId: string;
  collectionAddress: string;
  tokenIds: string[];
  metadataUris: string[];
  signatures: string[];
  mintedBy: string;
  timestamp: number;
}

export function useNFTLazyMintBatchV3() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [batches, setBatches] = useState<LazyMintBatch[]>([]);

  const lazyMintBatch = async (
    collectionAddress: string,
    tokenIds: string[],
    metadataUris: string[]
  ): Promise<LazyMintBatch> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (tokenIds.length !== metadataUris.length) {
      throw new Error('Token IDs and metadata URIs arrays must have the same length');
    }
    if (tokenIds.length === 0) {
      throw new Error('At least one token is required');
    }
    
    const message = `Lazy mint batch: ${collectionAddress} ${tokenIds.length} NFTs`;
    const signature = await signMessageAsync({ message });
    
    const batch: LazyMintBatch = {
      batchId: `batch-${Date.now()}`,
      collectionAddress,
      tokenIds,
      metadataUris,
      signatures: Array(tokenIds.length).fill(signature),
      mintedBy: address,
      timestamp: Date.now(),
    };
    
    setBatches([...batches, batch]);
    return batch;
  };

  return { lazyMintBatch, batches, address };
}
