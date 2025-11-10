'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface NFTDrop {
  id: string;
  collection: string;
  supply: number;
  price: bigint;
  claimed: number;
}

export function useNFTDrops() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const [drops, setDrops] = useState<NFTDrop[]>([]);

  const createDrop = async (collection: string, supply: number, price: string) => {
    if (!isConnected || !address) {
      throw new Error('Reown wallet not connected');
    }

    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'createDrop',
      args: [collection, supply, BigInt(price)],
    });

    const drop: NFTDrop = {
      id: txHash || '',
      collection,
      supply,
      price: BigInt(price),
      claimed: 0,
    };

    setDrops([...drops, drop]);
    return txHash;
  };

  return { createDrop, drops, isConnected, address };
}
