'use client';

import { useAccount, useReadContract, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Offer {
  marketplaceAddress: string;
  nftAddress: string;
  tokenId: bigint;
  price: bigint;
  expiry: number;
}

export function useNFTMarketplaceOfferAggregatorV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [aggregating, setAggregating] = useState(false);
  const [offers, setOffers] = useState<Offer[]>([]);

  const fetchOffers = async (nftAddress: string, tokenId: bigint, marketplaces: string[]) => {
    if (!address || !isConnected) return [];
    setAggregating(true);

    try {
      const message = `Aggregate offers for token ${tokenId}`;
      await signMessageAsync({ message });

      // Fetch offers from multiple marketplaces
      const allOffers: Offer[] = [];
      // Implementation would fetch from each marketplace
      setOffers(allOffers);
      return allOffers;
    } finally {
      setAggregating(false);
    }
  };

  const acceptBestOffer = async (offers: Offer[]) => {
    if (!address || !isConnected || offers.length === 0) throw new Error('No offers available');
    setAggregating(true);

    try {
      const bestOffer = offers.reduce((best, current) => 
        current.price > best.price ? current : best
      );

      const message = `Accept best offer: ${bestOffer.price}`;
      await signMessageAsync({ message });

      await writeContract({
        address: bestOffer.marketplaceAddress as `0x${string}`,
        abi: [],
        functionName: 'acceptOffer',
        args: [bestOffer.nftAddress, bestOffer.tokenId],
      });
    } finally {
      setAggregating(false);
    }
  };

  return {
    fetchOffers,
    acceptBestOffer,
    aggregating,
    offers,
    address,
    isConnected,
  };
}

