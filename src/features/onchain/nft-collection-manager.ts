'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface NFTCollection {
  address: string;
  name: string;
  symbol: string;
  totalSupply: number;
  wallet: string;
}

export function useNFTCollectionManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [collections, setCollections] = useState<NFTCollection[]>([]);

  const createCollection = async (name: string, symbol: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Create Collection: ${name} (${symbol})`;
    await signMessageAsync({ message });
    
    const collection: NFTCollection = {
      address: `0x${Date.now().toString(16)}`,
      name,
      symbol,
      totalSupply: 0,
      wallet: address,
    };
    
    setCollections([...collections, collection]);
    return collection;
  };

  return { createCollection, collections, address };
}

