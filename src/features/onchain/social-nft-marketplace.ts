'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface NFTListing {
  id: string;
  tokenId: string;
  collection: string;
  seller: string;
  price: string;
  currency: string;
  timestamp: number;
  status: 'active' | 'sold' | 'cancelled';
}

export function useSocialNFTMarketplace() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [listings, setListings] = useState<NFTListing[]>([]);

  const listNFT = async (
    tokenId: string,
    collection: string,
    price: string,
    currency: string
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `List NFT: ${tokenId} ${collection} ${price} ${currency}`;
    await signMessageAsync({ message });
    
    const listing: NFTListing = {
      id: `listing-${Date.now()}`,
      tokenId,
      collection,
      seller: address,
      price,
      currency,
      timestamp: Date.now(),
      status: 'active',
    };
    
    setListings([...listings, listing]);
    return listing;
  };

  return { listNFT, listings, address };
}

