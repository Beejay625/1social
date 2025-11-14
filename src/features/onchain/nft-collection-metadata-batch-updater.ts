'use client';

/**
 * NFT Collection Metadata Batch Updater
 * Update multiple NFT metadata in batch with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface BatchMetadataUpdate {
  updateId: string;
  collectionAddress: string;
  updates: Array<{
    tokenId: string;
    metadataUri: string;
  }>;
  updatedBy: string;
  timestamp: number;
}

export function useNFTCollectionMetadataBatchUpdater() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [updates, setUpdates] = useState<BatchMetadataUpdate[]>([]);

  const updateBatch = async (
    collectionAddress: string,
    updates: Array<{
      tokenId: string;
      metadataUri: string;
    }>
  ): Promise<BatchMetadataUpdate> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (updates.length === 0) {
      throw new Error('At least one update is required');
    }
    
    const message = `Update batch metadata: ${collectionAddress} ${updates.length} tokens`;
    await signMessageAsync({ message });
    
    const batchUpdate: BatchMetadataUpdate = {
      updateId: `batch-${Date.now()}`,
      collectionAddress,
      updates,
      updatedBy: address,
      timestamp: Date.now(),
    };
    
    setUpdates([...updates, batchUpdate]);
    return batchUpdate;
  };

  return { updateBatch, updates, address };
}

