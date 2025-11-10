'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface Bid {
  id: string;
  tokenId: string;
  collection: string;
  amount: bigint;
  bidder: string;
  placedAt: number;
}

export function useNFTBidManager() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [bids, setBids] = useState<Bid[]>([]);

  const placeBid = async (collection: string, tokenId: string, amount: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: collection as `0x${string}`,
      abi: [],
      functionName: 'placeBid',
      args: [BigInt(tokenId), BigInt(amount)],
    });

    const bid: Bid = {
      id: txHash || '',
      tokenId,
      collection,
      amount: BigInt(amount),
      bidder: address,
      placedAt: Date.now(),
    };

    setBids([...bids, bid]);
    return txHash;
  };

  return { placeBid, bids, address };
}

