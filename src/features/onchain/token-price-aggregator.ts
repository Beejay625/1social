'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface PriceData {
  token: string;
  price: bigint;
  source: string;
  timestamp: number;
}

export function useTokenPriceAggregator() {
  const { address } = useAccount();
  const { data: price } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getPrice',
  });
  const [prices, setPrices] = useState<PriceData[]>([]);

  useEffect(() => {
    if (!address || !price) return;
    
    const priceData: PriceData = {
      token: 'ETH',
      price: BigInt(price as string),
      source: 'chainlink',
      timestamp: Date.now(),
    };
    
    setPrices([priceData]);
  }, [address, price]);

  return { prices, address };
}

