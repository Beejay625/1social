'use client';

/**
 * NFT Collection Creator V3
 * Advanced NFT collection creation with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface NFTCollection {
  collectionId: string;
  name: string;
  symbol: string;
  maxSupply: number;
  baseURI: string;
  royaltyFee: number;
  createdBy: string;
  timestamp: number;
}

export function useNFTCollectionCreatorV3() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [collections, setCollections] = useState<NFTCollection[]>([]);

  const createCollection = async (
    name: string,
    symbol: string,
    maxSupply: number,
    baseURI: string,
    royaltyFee: number
  ): Promise<NFTCollection> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!name || !symbol) {
      throw new Error('Name and symbol are required');
    }
    
    const message = `Create NFT collection: ${name} (${symbol}) max supply ${maxSupply}`;
    await signMessageAsync({ message });
    
    const collection: NFTCollection = {
      collectionId: `collection-${Date.now()}`,
      name,
      symbol,
      maxSupply,
      baseURI,
      royaltyFee,
      createdBy: address,
      timestamp: Date.now(),
    };
    
    setCollections([...collections, collection]);
    return collection;
  };

  const updateCollection = async (
    collectionId: string,
    updates: Partial<NFTCollection>
  ): Promise<NFTCollection> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Update collection ${collectionId}`;
    await signMessageAsync({ message });
    
    const collection = collections.find(c => c.collectionId === collectionId);
    if (!collection) throw new Error('Collection not found');
    
    const updated = { ...collection, ...updates };
    setCollections(collections.map(c => c.collectionId === collectionId ? updated : c));
    return updated;
  };

  return { createCollection, updateCollection, collections, address };
}

