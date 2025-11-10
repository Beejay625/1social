'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface ReputationListing {
  id: string;
  seller: string;
  reputationScore: number;
  price: bigint;
  sold: boolean;
}

export function useReputationMarketplace() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [listings, setListings] = useState<ReputationListing[]>([]);

  const listReputation = async (score: number, price: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'listReputation',
      args: [score, BigInt(price)],
    });

    const listing: ReputationListing = {
      id: txHash || '',
      seller: address,
      reputationScore: score,
      price: BigInt(price),
      sold: false,
    };

    setListings([...listings, listing]);
    return txHash;
  };

  return { listReputation, listings, address };
}

