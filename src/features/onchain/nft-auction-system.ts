'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface Auction {
  id: string;
  tokenId: string;
  collection: string;
  startingPrice: bigint;
  duration: number;
  highestBid: bigint;
  ended: boolean;
}

export function useNFTAuctionSystem() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [auctions, setAuctions] = useState<Auction[]>([]);

  const createAuction = async (tokenId: string, collection: string, startingPrice: string, duration: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: collection as `0x${string}`,
      abi: [],
      functionName: 'createAuction',
      args: [BigInt(tokenId), BigInt(startingPrice), duration],
    });

    const auction: Auction = {
      id: txHash || '',
      tokenId,
      collection,
      startingPrice: BigInt(startingPrice),
      duration,
      highestBid: BigInt(0),
      ended: false,
    };

    setAuctions([...auctions, auction]);
    return txHash;
  };

  return { createAuction, auctions, address };
}

