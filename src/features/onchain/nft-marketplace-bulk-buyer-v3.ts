'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BulkPurchase {
  marketplaceAddress: string;
  listings: Array<{
    nftAddress: string;
    tokenId: bigint;
    price: bigint;
  }>;
}

export function useNFTMarketplaceBulkBuyerV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [buying, setBuying] = useState(false);
  const [progress, setProgress] = useState(0);

  const executeBulkPurchase = async (purchase: BulkPurchase) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setBuying(true);
    setProgress(0);

    try {
      const totalValue = purchase.listings.reduce((sum, listing) => sum + listing.price, BigInt(0));
      const message = `Bulk buy ${purchase.listings.length} NFTs`;
      await signMessageAsync({ message });

      // Batch purchases for gas efficiency
      const batchSize = 5;
      const batches = Math.ceil(purchase.listings.length / batchSize);

      for (let i = 0; i < batches; i++) {
        const start = i * batchSize;
        const end = Math.min(start + batchSize, purchase.listings.length);
        const batch = purchase.listings.slice(start, end);

        await writeContract({
          address: purchase.marketplaceAddress as `0x${string}`,
          abi: [],
          functionName: 'bulkBuy',
          args: [batch],
          value: batch.reduce((sum, l) => sum + l.price, BigInt(0)),
        });

        setProgress(Math.round(((i + 1) / batches) * 100));
      }
    } finally {
      setBuying(false);
    }
  };

  return {
    executeBulkPurchase,
    buying,
    progress,
    address,
    isConnected,
  };
}

