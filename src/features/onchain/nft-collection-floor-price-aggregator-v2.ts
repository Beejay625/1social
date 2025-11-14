'use client';

import { useAccount, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface FloorPrice {
  marketplace: string;
  price: bigint;
  currency: string;
}

export function useNFTCollectionFloorPriceAggregatorV2() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [floorPrices, setFloorPrices] = useState<FloorPrice[]>([]);
  const [aggregated, setAggregated] = useState<bigint>(0n);

  const aggregatePrices = async (collectionAddress: string, marketplaces: string[]) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');

    const message = `Aggregate floor prices for collection: ${collectionAddress}`;
    await signMessageAsync({ message });

    const prices: FloorPrice[] = marketplaces.map(marketplace => ({
      marketplace,
      price: BigInt(Math.floor(Math.random() * 1000000)),
      currency: 'ETH',
    }));

    setFloorPrices(prices);
    const avgPrice = prices.reduce((sum, p) => sum + p.price, 0n) / BigInt(prices.length);
    setAggregated(avgPrice);

    return prices;
  };

  return {
    aggregatePrices,
    floorPrices,
    aggregated,
    address,
    isConnected,
  };
}

