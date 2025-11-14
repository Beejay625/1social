'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BulkListing {
  tokenIds: bigint[];
  prices: bigint[];
}

export function useNFTMarketplaceBulkSellerV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [selling, setSelling] = useState(false);

  const sellBulk = async (marketplaceAddress: string, listing: BulkListing) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setSelling(true);

    try {
      const message = `Bulk list ${listing.tokenIds.length} NFTs on marketplace`;
      await signMessageAsync({ message });

      await writeContract({
        address: marketplaceAddress as `0x${string}`,
        abi: [],
        functionName: 'bulkList',
        args: [listing.tokenIds, listing.prices],
      });
    } finally {
      setSelling(false);
    }
  };

  return {
    sellBulk,
    selling,
    address,
    isConnected,
  };
}

