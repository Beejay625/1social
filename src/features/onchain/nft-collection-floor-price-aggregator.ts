'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface FloorPrice {
  collectionAddress: string;
  floorPrice: string;
  currency: string;
  timestamp: number;
  source: string;
}

export function useNFTCollectionFloorPriceAggregator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [prices, setPrices] = useState<FloorPrice[]>([]);

  const aggregateFloorPrice = async (
    collectionAddress: string,
    currency: string = 'ETH'
  ): Promise<FloorPrice> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Aggregate floor price: ${collectionAddress}`;
    await signMessageAsync({ message });
    
    // Simulated aggregation - in production, this would query multiple marketplaces
    const floorPrice: FloorPrice = {
      collectionAddress,
      floorPrice: '0.5', // Simulated price
      currency,
      timestamp: Date.now(),
      source: 'aggregated',
    };
    
    setPrices([...prices, floorPrice]);
    return floorPrice;
  };

  return { aggregateFloorPrice, prices, address };
}

