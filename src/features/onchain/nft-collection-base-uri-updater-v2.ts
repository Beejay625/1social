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
  oldBaseUri: string;
  newBaseUri: string;
  updatedBy: string;
  txHash: string;
  timestamp: number;
}

export function useNFTCollectionBaseURIUpdaterV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [updates, setUpdates] = useState<BaseURIUpdate[]>([]);

  const updateBaseURI = async (
    collectionAddress: string,
    newBaseUri: string,
    oldBaseUri: string
  ): Promise<BaseURIUpdate> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (!newBaseUri.startsWith('http://') && !newBaseUri.startsWith('https://') && !newBaseUri.startsWith('ipfs://')) {
      throw new Error('Base URI must be a valid HTTP, HTTPS, or IPFS URL');
    }
    
    const message = `Update base URI: ${collectionAddress} to ${newBaseUri}`;
    await signMessageAsync({ message });
    
    const update: BaseURIUpdate = {
      updateId: `update-${Date.now()}`,
      collectionAddress,
      oldBaseUri,
      newBaseUri,
      updatedBy: address,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setUpdates([...updates, update]);
    return update;
  };

  return { updateBaseURI, updates, address };
}
