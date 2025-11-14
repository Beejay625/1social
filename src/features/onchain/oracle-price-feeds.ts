'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface PriceFeed {
  pair: string;
  price: bigint;
  timestamp: number;
  decimals: number;
}

export function useOraclePriceFeeds() {
  const { address } = useAccount();
  const { data: price } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getPrice',
  });
  const [feeds, setFeeds] = useState<PriceFeed[]>([]);

  useEffect(() => {
    if (!address || !price) return;
    
    const feed: PriceFeed = {
      pair: 'ETH/USD',
      price: BigInt(price as string),
      timestamp: Date.now(),
      decimals: 8,
    };
    
    setFeeds([feed]);
  }, [address, price]);

  return { feeds, address };
}


