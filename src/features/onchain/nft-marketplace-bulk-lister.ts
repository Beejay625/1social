'use client';

import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

export interface BulkListing {
  marketplaceAddress: string;
  collectionAddress: string;
  tokenIds: string[];
  prices: string[];
  listingId: string;
}

export function useNFTMarketplaceBulkLister() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [listings, setListings] = useState<BulkListing[]>([]);

  const bulkList = async (marketplaceAddress: string, collectionAddress: string, tokenIds: string[], prices: string[]) => {
    if (!address || !isConnected) throw new Error('Reown wallet not connected');
    if (tokenIds.length !== prices.length) throw new Error('Token IDs and prices must match');
    
    const message = `Bulk list ${tokenIds.length} NFTs on marketplace ${marketplaceAddress}`;
    await signMessageAsync({ message });
    
    const listing: BulkListing = {
      marketplaceAddress,
      collectionAddress,
      tokenIds,
      prices,
      listingId: `bulk_list_${Date.now()}`,
    };
    
    setListings([...listings, listing]);
    return listing;
  };

  return { 
    bulkList, 
    listings, 
    address, 
    isConnected,
    hash,
    isPending,
    isConfirming,
    isConfirmed
  };
}

