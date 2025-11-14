'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RentalListing {
  tokenId: bigint;
  pricePerDay: bigint;
  minDuration: number;
  maxDuration: number;
}

export function useNFTRentalMarketplaceV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [listing, setListing] = useState(false);

  const listForRent = async (marketplaceAddress: string, rental: RentalListing) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setListing(true);

    try {
      const message = `List NFT for rent: token ${rental.tokenId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: marketplaceAddress as `0x${string}`,
        abi: [],
        functionName: 'listForRent',
        args: [rental.tokenId, rental.pricePerDay, rental.minDuration, rental.maxDuration],
      });
    } finally {
      setListing(false);
    }
  };

  return {
    listForRent,
    listing,
    address,
    isConnected,
  };
}

