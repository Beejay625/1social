'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BulkPurchase {
  tokenIds: bigint[];
  prices: bigint[];
}

export function useNFTMarketplaceBulkBuyerV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [buying, setBuying] = useState(false);

  const buyBulk = async (marketplaceAddress: string, purchase: BulkPurchase) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setBuying(true);

    try {
      const message = `Bulk buy ${purchase.tokenIds.length} NFTs`;
      await signMessageAsync({ message });

      await writeContract({
        address: marketplaceAddress as `0x${string}`,
        abi: [],
        functionName: 'bulkBuy',
        args: [purchase.tokenIds, purchase.prices],
      });
    } finally {
      setBuying(false);
    }
  };

  return {
    buyBulk,
    buying,
    address,
    isConnected,
  };
}
