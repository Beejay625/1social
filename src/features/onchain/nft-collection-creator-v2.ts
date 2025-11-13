'use client';

/**
 * NFT Collection Creator V2
 * Create NFT collections with advanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Collection {
  collectionId: string;
  name: string;
  symbol: string;
  maxSupply: number;
  baseURI: string;
  royaltyPercentage: number;
  contractAddress: string;
  createdBy: string;
  timestamp: number;
}

export function useNFTCollectionCreatorV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [collections, setCollections] = useState<Collection[]>([]);

  const create = async (
    name: string,
    symbol: string,
    maxSupply: number,
    baseURI: string,
    royaltyPercentage: number
  ): Promise<Collection> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!name || name.trim() === '') {
      throw new Error('Collection name is required');
    }
    if (royaltyPercentage < 0 || royaltyPercentage > 100) {
      throw new Error('Royalty percentage must be between 0 and 100');
    }
    
    const message = `Create collection: ${name} (${symbol})`;
    await signMessageAsync({ message });
    
    const collection: Collection = {
      collectionId: `collection-${Date.now()}`,
      name,
      symbol,
      maxSupply,
      baseURI,
      royaltyPercentage,
      contractAddress: `0x${Date.now().toString(16)}`,
      createdBy: address,
      timestamp: Date.now(),
    };
    
    setCollections([...collections, collection]);
    return collection;
  };

  return { create, collections, address };
}

