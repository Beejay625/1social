'use client';

/**
 * NFT Collection Base URI Manager V3
 * Manage collection base URI with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface URIUpdate {
  updateId: string;
  collectionAddress: string;
  newBaseURI: string;
  updatedBy: string;
  timestamp: number;
}

export function useNFTCollectionBaseURIManagerV3() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [updates, setUpdates] = useState<URIUpdate[]>([]);

  const updateBaseURI = async (
    collectionAddress: string,
    newBaseURI: string
  ): Promise<URIUpdate> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (!newBaseURI.startsWith('http://') && !newBaseURI.startsWith('https://') && !newBaseURI.startsWith('ipfs://')) {
      throw new Error('Invalid URI format');
    }
    
    const message = `Update base URI V3: ${collectionAddress} to ${newBaseURI}`;
    await signMessageAsync({ message });
    
    const update: URIUpdate = {
      updateId: `uri-v3-${Date.now()}`,
      collectionAddress,
      newBaseURI,
      updatedBy: address,
      timestamp: Date.now(),
    };
    
    setUpdates([...updates, update]);
    return update;
  };

  return { updateBaseURI, updates, address };
}
