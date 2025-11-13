'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface NFTCollection {
  collection: string;
  name: string;
  symbol: string;
  maxSupply: bigint;
  minted: bigint;
  wallet: string;
  timestamp: number;
}

export function useContractNFTCollectionManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [collections, setCollections] = useState<NFTCollection[]>([]);

  const createCollection = async (collection: string, name: string, symbol: string, maxSupply: bigint, minted: bigint) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Create NFT Collection: ${name} (${symbol})`;
    await signMessageAsync({ message });
    
    const nftCollection: NFTCollection = {
      collection,
      name,
      symbol,
      maxSupply,
      minted,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setCollections([...collections, nftCollection]);
    return nftCollection;
  };

  return { createCollection, collections, address };
}

