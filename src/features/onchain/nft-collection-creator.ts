'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface NFTCollection {
  id: string;
  name: string;
  symbol: string;
  maxSupply: bigint;
  contractAddress: string;
}

export function useNFTCollectionCreator() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [collections, setCollections] = useState<NFTCollection[]>([]);

  const createCollection = async (name: string, symbol: string, maxSupply: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'createCollection',
      args: [name, symbol, BigInt(maxSupply)],
    });

    const collection: NFTCollection = {
      id: txHash || '',
      name,
      symbol,
      maxSupply: BigInt(maxSupply),
      contractAddress: `0x${Date.now().toString(16)}`,
    };

    setCollections([...collections, collection]);
    return txHash;
  };

  return { createCollection, collections, address };
}


