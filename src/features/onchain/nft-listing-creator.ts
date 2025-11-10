'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface NFTListing {
  tokenId: string;
  collection: string;
  price: bigint;
  currency: string;
  listed: boolean;
}

export function useNFTListingCreator() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [listings, setListings] = useState<NFTListing[]>([]);

  const createListing = async (collection: string, tokenId: string, price: string, currency: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: collection as `0x${string}`,
      abi: [],
      functionName: 'list',
      args: [BigInt(tokenId), BigInt(price), currency],
    });

    const listing: NFTListing = {
      tokenId,
      collection,
      price: BigInt(price),
      currency,
      listed: true,
    };

    setListings([...listings, listing]);
    return txHash;
  };

  return { createListing, listings, address };
}

