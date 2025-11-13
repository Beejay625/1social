'use client';

/**
 * NFT Marketplace Offer Aggregator
 * Aggregate and compare marketplace offers with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface OfferAggregation {
  tokenId: string;
  collectionAddress: string;
  offers: Array<{
    marketplace: string;
    price: string;
    currency: string;
    offerer: string;
  }>;
  bestOffer: {
    marketplace: string;
    price: string;
    currency: string;
  };
  timestamp: number;
}

export function useNFTMarketplaceOfferAggregator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [aggregations, setAggregations] = useState<OfferAggregation[]>([]);

  const aggregateOffers = async (
    tokenId: string,
    collectionAddress: string
  ): Promise<OfferAggregation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    
    const message = `Aggregate offers: ${collectionAddress} #${tokenId}`;
    await signMessageAsync({ message });
    
    const offers = [
      { marketplace: 'OpenSea', price: '1.5', currency: 'ETH', offerer: '0x1' },
      { marketplace: 'LooksRare', price: '1.4', currency: 'ETH', offerer: '0x2' },
    ];
    
    const bestOffer = offers.reduce((best, offer) => 
      parseFloat(offer.price) > parseFloat(best.price) ? offer : best
    );
    
    const aggregation: OfferAggregation = {
      tokenId,
      collectionAddress,
      offers,
      bestOffer: {
        marketplace: bestOffer.marketplace,
        price: bestOffer.price,
        currency: bestOffer.currency,
      },
      timestamp: Date.now(),
    };
    
    setAggregations([...aggregations, aggregation]);
    return aggregation;
  };

  return { aggregateOffers, aggregations, address };
}
