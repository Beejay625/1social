'use client';

/**
 * NFT Collection Creator V2
 * Create NFT collections with advanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface CollectionCreation {
  creationId: string;
  name: string;
  symbol: string;
  maxSupply: number;
  baseUri: string;
  royaltyPercentage: number;
  royaltyRecipient: string;
  createdBy: string;
  contractAddress?: string;
  timestamp: number;
}

export function useNFTCollectionCreatorV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [creations, setCreations] = useState<CollectionCreation[]>([]);

  const createCollection = async (
    name: string,
    symbol: string,
    maxSupply: number,
    baseUri: string,
    royaltyPercentage: number,
    royaltyRecipient: string
  ): Promise<CollectionCreation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (maxSupply <= 0) {
      throw new Error('Max supply must be greater than zero');
    }
    if (royaltyPercentage < 0 || royaltyPercentage > 100) {
      throw new Error('Royalty percentage must be between 0 and 100');
    }
    if (!royaltyRecipient.startsWith('0x')) {
      throw new Error('Invalid royalty recipient address format');
    }
    
    const message = `Create collection: ${name} (${symbol}) max supply ${maxSupply}`;
    await signMessageAsync({ message });
    
    const creation: CollectionCreation = {
      creationId: `create-${Date.now()}`,
      name,
      symbol,
      maxSupply,
      baseUri,
      royaltyPercentage,
      royaltyRecipient,
      createdBy: address,
      contractAddress: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setCreations([...creations, creation]);
    return creation;
  };

  return { createCollection, creations, address };
}
