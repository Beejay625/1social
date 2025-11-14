'use client';

/**
 * NFT Lazy Mint Batch
 * Lazy mint multiple NFTs in batch with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface LazyMintBatch {
  batchId: string;
  collectionAddress: string;
  metadataURIs: string[];
  quantity: number;
  mintedBy: string;
  timestamp: number;
}

export function useNFTLazyMintBatch() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [batches, setBatches] = useState<LazyMintBatch[]>([]);

  const lazyMintBatch = async (
    collectionAddress: string,
    metadataURIs: string[]
  ): Promise<LazyMintBatch> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (metadataURIs.length === 0) {
      throw new Error('Metadata URIs array cannot be empty');
    }
    
    const message = `Lazy mint batch: ${collectionAddress} ${metadataURIs.length} NFTs`;
    await signMessageAsync({ message });
    
    const batch: LazyMintBatch = {
      batchId: `batch-${Date.now()}`,
      collectionAddress,
      metadataURIs,
      quantity: metadataURIs.length,
      mintedBy: address,
      timestamp: Date.now(),
    };
    
    setBatches([...batches, batch]);
    return batch;
  };

  return { lazyMintBatch, batches, address };
}
