'use client';

/**
 * NFT Marketplace Listing Manager
 * Manage NFT marketplace listings with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Listing {
  listingId: string;
  tokenId: string;
  collectionAddress: string;
  marketplace: string;
  price: string;
  currency: string;
  status: 'active' | 'sold' | 'cancelled';
  timestamp: number;
}

export function useNFTMarketplaceListingManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [listings, setListings] = useState<Listing[]>([]);

  const createListing = async (
    tokenId: string,
    collectionAddress: string,
    marketplace: string,
    price: string,
    currency: string
  ): Promise<Listing> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (parseFloat(price) <= 0) {
      throw new Error('Price must be greater than zero');
    }
    
    const message = `Create listing: ${collectionAddress} #${tokenId} on ${marketplace}`;
    await signMessageAsync({ message });
    
    const listing: Listing = {
      listingId: `listing-${Date.now()}`,
      tokenId,
      collectionAddress,
      marketplace,
      price,
      currency,
      status: 'active',
      timestamp: Date.now(),
    };
    
    setListings([...listings, listing]);
    return listing;
  };

  return { createListing, listings, address };
}
