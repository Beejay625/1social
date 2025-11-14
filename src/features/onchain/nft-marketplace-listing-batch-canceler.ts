'use client';

/**
 * NFT Marketplace Listing Batch Canceler
 * Cancel multiple listings in batch with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface BatchCancellation {
  cancellationId: string;
  collectionAddress: string;
  listingIds: string[];
  canceledBy: string;
  timestamp: number;
}

export function useNFTMarketplaceListingBatchCanceler() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [cancellations, setCancellations] = useState<BatchCancellation[]>([]);

  const cancelBatch = async (
    collectionAddress: string,
    listingIds: string[]
  ): Promise<BatchCancellation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (listingIds.length === 0) {
      throw new Error('At least one listing ID is required');
    }
    
    const message = `Cancel batch listings: ${collectionAddress} ${listingIds.length} listings`;
    await signMessageAsync({ message });
    
    const cancellation: BatchCancellation = {
      cancellationId: `cancel-${Date.now()}`,
      collectionAddress,
      listingIds,
      canceledBy: address,
      timestamp: Date.now(),
    };
    
    setCancellations([...cancellations, cancellation]);
    return cancellation;
  };

  return { cancelBatch, cancellations, address };
}

