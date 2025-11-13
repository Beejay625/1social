'use client';

import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

/**
 * Metadata update for a single token
 */
export interface MetadataUpdate {
  tokenId: string;
  metadataUri: string;
  attributes?: Record<string, any>;
}

/**
 * Batch metadata update information
 */
export interface BatchUpdate {
  collectionAddress: string;
  updates: MetadataUpdate[];
  updateId: string;
  timestamp: number;
}

/**
 * Hook for batch updating NFT metadata with Reown wallet integration
 * Updates metadata for multiple NFTs efficiently
 */
export function useNFTMetadataBatchUpdaterV2() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [batchUpdates, setBatchUpdates] = useState<BatchUpdate[]>([]);

  const updateBatch = async (collectionAddress: string, updates: MetadataUpdate[]) => {
    if (!address || !isConnected) throw new Error('Reown wallet not connected');
    
    const message = `Update metadata for ${updates.length} NFTs in ${collectionAddress}`;
    await signMessageAsync({ message });
    
    const batchUpdate: BatchUpdate = {
      collectionAddress,
      updates,
      updateId: `update_${Date.now()}`,
      timestamp: Date.now(),
    };
    
    setBatchUpdates([...batchUpdates, batchUpdate]);
    return batchUpdate;
  };

  return { 
    updateBatch, 
    batchUpdates, 
    address, 
    isConnected,
    hash,
    isPending,
    isConfirming,
    isConfirmed
  };
}

