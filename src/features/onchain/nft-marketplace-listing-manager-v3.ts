'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ListingData {
  nftAddress: string;
  tokenId: bigint;
  price: bigint;
  duration: number;
  reservePrice?: bigint;
}

export function useNFTMarketplaceListingManagerV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);

  const { data: activeListings } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getListings',
    args: [address],
  });

  const createListing = async (marketplaceAddress: string, listing: ListingData) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `List NFT ${listing.tokenId} at ${listing.price}`;
      await signMessageAsync({ message });

      await writeContract({
        address: marketplaceAddress as `0x${string}`,
        abi: [],
        functionName: 'listNFT',
        args: [listing.nftAddress, listing.tokenId, listing.price, listing.duration],
      });
    } finally {
      setManaging(false);
    }
  };

  const updateListing = async (marketplaceAddress: string, listingId: number, newPrice: bigint) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      await signMessageAsync({ message: `Update listing ${listingId}` });
      await writeContract({
        address: marketplaceAddress as `0x${string}`,
        abi: [],
        functionName: 'updateListing',
        args: [listingId, newPrice],
      });
    } finally {
      setManaging(false);
    }
  };

  const cancelListing = async (marketplaceAddress: string, listingId: number) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      await signMessageAsync({ message: `Cancel listing ${listingId}` });
      await writeContract({
        address: marketplaceAddress as `0x${string}`,
        abi: [],
        functionName: 'cancelListing',
        args: [listingId],
      });
    } finally {
      setManaging(false);
    }
  };

  return {
    createListing,
    updateListing,
    cancelListing,
    managing,
    address,
    isConnected,
    activeListings,
  };
}

