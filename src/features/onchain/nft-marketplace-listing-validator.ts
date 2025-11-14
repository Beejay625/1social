'use client';

import { useAccount, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ListingValidation {
  valid: boolean;
  errors: string[];
  warnings: string[];
  recommendations: string[];
}

export interface ListingData {
  nftAddress: string;
  tokenId: bigint;
  price: bigint;
  marketplaceAddress: string;
  duration: number;
}

export function useNFTMarketplaceListingValidator() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [validating, setValidating] = useState(false);

  const { data: floorPrice } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'floorPrice',
  });

  const { data: averagePrice } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'averagePrice',
  });

  const validateListing = async (listing: ListingData): Promise<ListingValidation> => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setValidating(true);

    try {
      const message = `Validate listing for token ${listing.tokenId}`;
      await signMessageAsync({ message });

      const errors: string[] = [];
      const warnings: string[] = [];
      const recommendations: string[] = [];

      // Price validation
      if (listing.price <= BigInt(0)) {
        errors.push('Price must be greater than 0');
      }

      const floor = floorPrice as bigint || BigInt(0);
      const avg = averagePrice as bigint || BigInt(0);

      if (floor > BigInt(0) && listing.price < floor) {
        warnings.push(`Price is below floor price (${floor})`);
      }

      if (avg > BigInt(0)) {
        const priceDiff = Number((listing.price - avg) * BigInt(100) / avg);
        if (priceDiff > 50) {
          warnings.push('Price is significantly above average');
        } else if (priceDiff < -20) {
          recommendations.push('Consider increasing price to match market average');
        }
      }

      // Duration validation
      if (listing.duration <= 0) {
        errors.push('Duration must be greater than 0');
      }

      const validation: ListingValidation = {
        valid: errors.length === 0,
        errors,
        warnings,
        recommendations,
      };

      return validation;
    } finally {
      setValidating(false);
    }
  };

  return {
    validateListing,
    validating,
    address,
    isConnected,
    floorPrice,
    averagePrice,
  };
}
