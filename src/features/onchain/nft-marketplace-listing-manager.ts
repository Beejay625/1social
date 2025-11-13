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
  price: string;
  currency: string;
  marketplace: string;
  listedBy: string;
  active: boolean;
  timestamp: number;
}

export function useNFTMarketplaceListingManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [listings, setListings] = useState<Listing[]>([]);

  const createListing = async (
    tokenId: string,
    collectionAddress: string,
    price: string,
    currency: string,
    marketplace: string
  ): Promise<Listing> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (parseFloat(price) <= 0) {
      throw new Error('Price must be greater than zero');
    }
    
    const message = `Create listing: ${collectionAddress} #${tokenId} for ${price} ${currency}`;
    await signMessageAsync({ message });
    
    const listing: Listing = {
      listingId: `listing-${Date.now()}`,
      tokenId,
      collectionAddress,
      price,
      currency,
      marketplace,
      listedBy: address,
      active: true,
      timestamp: Date.now(),
    };
    
    setListings([...listings, listing]);
    return listing;
  };

  const cancelListing = (listingId: string) => {
    setListings(listings.map(l => l.listingId === listingId ? { ...l, active: false } : l));
  };

  return { createListing, cancelListing, listings, address };
}
