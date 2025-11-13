'use client';

/**
 * NFT Collection Base URI Updater V2
 * Update collection base URI with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BaseURIUpdate {
  updateId: string;
  collectionAddress: string;
  oldBaseURI: string;
  newBaseURI: string;
  updatedBy: string;
  timestamp: number;
}

export function useNFTCollectionBaseURIUpdaterV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [updates, setUpdates] = useState<BaseURIUpdate[]>([]);

  const updateBaseURI = async (
    collectionAddress: string,
    newBaseURI: string,
    oldBaseURI: string
  ): Promise<BaseURIUpdate> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (!newBaseURI || newBaseURI.trim() === '') {
      throw new Error('New base URI cannot be empty');
    }
    
    const message = `Update base URI: ${collectionAddress}`;
    await signMessageAsync({ message });
    
    const update: BaseURIUpdate = {
      updateId: `update-${Date.now()}`,
      collectionAddress,
      oldBaseURI,
      newBaseURI,
      updatedBy: address,
      timestamp: Date.now(),
    };
    
    setUpdates([...updates, update]);
    return update;
  };

  return { updateBaseURI, updates, address };
}

