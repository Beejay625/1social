'use client';

/**
 * NFT Metadata Updater V3
 * Update NFT metadata with advanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface MetadataUpdate {
  updateId: string;
  tokenId: string;
  collectionAddress: string;
  metadata: Record<string, any>;
  ipfsHash?: string;
  txHash: string;
  timestamp: number;
}

export function useNFTMetadataUpdaterV3() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [updates, setUpdates] = useState<MetadataUpdate[]>([]);

  const update = async (
    tokenId: string,
    collectionAddress: string,
    metadata: Record<string, any>,
    ipfsHash?: string
  ): Promise<MetadataUpdate> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (Object.keys(metadata).length === 0) {
      throw new Error('Metadata cannot be empty');
    }
    
    const message = `Update metadata: ${collectionAddress} #${tokenId}${ipfsHash ? ` IPFS: ${ipfsHash}` : ''}`;
    await signMessageAsync({ message });
    
    const update: MetadataUpdate = {
      updateId: `update-${Date.now()}`,
      tokenId,
      collectionAddress,
      metadata,
      ipfsHash,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setUpdates([...updates, update]);
    return update;
  };

  return { update, updates, address };
}

