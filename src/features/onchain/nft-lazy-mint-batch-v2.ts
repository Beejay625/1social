'use client';

/**
 * NFT Lazy Mint Batch V2
 * Lazy mint multiple NFTs in batch with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface LazyMintBatch {
  batchId: string;
  collectionAddress: string;
  tokenIds: string[];
  metadataUris: string[];
  signature: string;
  mintedBy: string;
  timestamp: number;
}

export function useNFTLazyMintBatchV2() {
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
    
    const message = `Lazy mint batch: ${collectionAddress} ${tokenIds.length} NFTs`;
    const signature = await signMessageAsync({ message });
    
    const batch: LazyMintBatch = {
      batchId: `batch-${Date.now()}`,
      collectionAddress,
      tokenIds,
      metadataUris,
      signature,
      mintedBy: address,
      timestamp: Date.now(),
    };
    
    setBatches([...batches, batch]);
    return batch;
  };

  return { lazyMintBatch, batches, address };
}
