'use client';

/**
 * NFT Marketplace Listing Manager V2
 * Manage NFT marketplace listings with enhanced features via Reown wallet
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
  expiresAt?: number;
  active: boolean;
  listedBy: string;
  timestamp: number;
}

export function useNFTMarketplaceListingManagerV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [listings, setListings] = useState<Listing[]>([]);

  const createListing = async (
    tokenId: string,
    collectionAddress: string,
    price: string,
    currency: string,
    marketplace: string,
    expiresAt?: number
  ): Promise<Listing> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (expiresAt && expiresAt <= Date.now()) {
      throw new Error('Expiration time must be in the future');
    }
    
    const message = `Create listing: ${collectionAddress} #${tokenId} ${price} ${currency}`;
    await signMessageAsync({ message });
    
    const listing: Listing = {
      listingId: `listing-${Date.now()}`,
      tokenId,
      collectionAddress,
      price,
      currency,
      marketplace,
      expiresAt,
      active: true,
      listedBy: address,
      timestamp: Date.now(),
    };
    
    setListings([...listings, listing]);
    return listing;
  };

  const cancelListing = async (listingId: string): Promise<void> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Cancel listing: ${listingId}`;
    await signMessageAsync({ message });
    
    setListings((prev) => prev.map(listing => 
      listing.listingId === listingId ? { ...listing, active: false } : listing
    ));
  };

  return { createListing, cancelListing, listings, address };
}
