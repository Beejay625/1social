'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface AutoListingConfig {
  nftAddress: string;
  tokenIds: bigint[];
  basePrice: bigint;
  priceMultiplier: number;
  duration: number;
  autoRelist: boolean;
}

export function useNFTMarketplaceAutomatedListing() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [automating, setAutomating] = useState(false);

  const setupAutoListing = async (marketplaceAddress: string, config: AutoListingConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setAutomating(true);

    try {
      const message = `Setup auto-listing for ${config.tokenIds.length} NFTs`;
      await signMessageAsync({ message });

      await writeContract({
        address: marketplaceAddress as `0x${string}`,
        abi: [],
        functionName: 'setupAutoListing',
        args: [
          config.nftAddress,
          config.tokenIds,
          config.basePrice,
          config.priceMultiplier,
          config.duration,
          config.autoRelist,
        ],
      });
    } finally {
      setAutomating(false);
    }
  };

  return {
    setupAutoListing,
    automating,
    address,
    isConnected,
  };
}

