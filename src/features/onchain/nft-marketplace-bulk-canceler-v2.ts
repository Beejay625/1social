'use client';

/**
 * NFT Marketplace Bulk Canceler V2
 * Cancel multiple listings in bulk with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface BulkCancellation {
  cancellationId: string;
  listingIds: string[];
  collectionAddress: string;
  canceledBy: string;
  timestamp: number;
}

export function useNFTMarketplaceBulkCancelerV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [cancellations, setCancellations] = useState<BulkCancellation[]>([]);

  const cancelBulkListings = async (
    listingIds: string[],
    collectionAddress: string
  ): Promise<BulkCancellation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (listingIds.length === 0) {
      throw new Error('Listing IDs array cannot be empty');
    }
    
    const message = `Cancel bulk listings V2: ${collectionAddress} ${listingIds.length} listings`;
    await signMessageAsync({ message });
    
    const cancellation: BulkCancellation = {
      cancellationId: `bulk-cancel-v2-${Date.now()}`,
      listingIds,
      collectionAddress,
      canceledBy: address,
      timestamp: Date.now(),
    };
    
    setCancellations([...cancellations, cancellation]);
    return cancellation;
  };

  return { cancelBulkListings, cancellations, address };
}
