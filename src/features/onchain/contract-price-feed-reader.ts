'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface PriceFeed {
  feed: string;
  price: bigint;
  decimals: number;
  timestamp: number;
}

export function useContractPriceFeedReader() {
  const { address } = useAccount();
  const [feeds, setFeeds] = useState<PriceFeed[]>([]);

  const { data: feedData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'latestRoundData',
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (address && feedData) {
      const feed: PriceFeed = {
        feed: '0x',
        price: (feedData as any)?.answer || 0n,
        decimals: 8,
        timestamp: Date.now(),
      };
      setFeeds([feed]);
    }
  }, [address, feedData]);

  return { feeds, address };
}

