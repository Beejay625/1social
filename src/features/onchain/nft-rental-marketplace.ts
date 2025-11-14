'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RentalListing {
  nftAddress: string;
  tokenId: bigint;
  pricePerDay: bigint;
  minDuration: number;
  maxDuration: number;
}

export function useNFTRentalMarketplace() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [listing, setListing] = useState(false);
  const [renting, setRenting] = useState(false);

  const { data: activeRentals } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getActiveRentals',
    args: [address],
  });

  const listForRent = async (rental: RentalListing) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setListing(true);

    try {
      const message = `List NFT ${rental.tokenId} for rent`;
      await signMessageAsync({ message });

      await writeContract({
        address: rental.nftAddress as `0x${string}`,
        abi: [],
        functionName: 'listForRent',
        args: [rental.tokenId, rental.pricePerDay, rental.minDuration, rental.maxDuration],
      });
    } finally {
      setListing(false);
    }
  };

  const rentNFT = async (nftAddress: string, tokenId: bigint, duration: number) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setRenting(true);

    try {
      const message = `Rent NFT ${tokenId} for ${duration} days`;
      await signMessageAsync({ message });

      const totalPrice = BigInt(duration) * BigInt(1000000); // Calculate total price
      await writeContract({
        address: nftAddress as `0x${string}`,
        abi: [],
        functionName: 'rentNFT',
        args: [tokenId, duration],
        value: totalPrice,
      });
    } finally {
      setRenting(false);
    }
  };

  return {
    listForRent,
    rentNFT,
    listing,
    renting,
    address,
    isConnected,
    activeRentals,
  };
}

