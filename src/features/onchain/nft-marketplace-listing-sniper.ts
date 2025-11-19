'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ListingSnipe {
  nftAddress: string;
  tokenId: bigint;
  maxPrice: bigint;
  marketplaceAddress: string;
  monitoring: boolean;
}

export function useNFTMarketplaceListingSniper() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [snipping, setSnipping] = useState(false);
  const [monitoring, setMonitoring] = useState(false);

  const { data: currentListing } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getListing',
    args: ['0x', BigInt(0)],
  });

  const setupSnipe = async (snipe: ListingSnipe) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setSnipping(true);

    try {
      const message = `Setup listing snipe for token ${snipe.tokenId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: snipe.marketplaceAddress as `0x${string}`,
        abi: [],
        functionName: 'setupSnipe',
        args: [snipe.nftAddress, snipe.tokenId, snipe.maxPrice],
      });

      setMonitoring(true);
    } finally {
      setSnipping(false);
    }
  };

  const executeSnipe = async (marketplaceAddress: string, listingId: number) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setSnipping(true);

    try {
      const message = `Execute snipe for listing ${listingId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: marketplaceAddress as `0x${string}`,
        abi: [],
        functionName: 'executeSnipe',
        args: [listingId],
      });
    } finally {
      setSnipping(false);
    }
  };

  return {
    setupSnipe,
    executeSnipe,
    snipping,
    monitoring,
    address,
    isConnected,
    currentListing,
  };
}

