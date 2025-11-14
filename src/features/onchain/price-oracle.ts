'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface PriceData {
  token: string;
  price: bigint;
  timestamp: number;
  source: string;
}

export function usePriceOracle() {
  const { address } = useAccount();
  const [prices, setPrices] = useState<PriceData[]>([]);

  const { data: priceData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getPrice',
    args: ['ETH'],
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (priceData) {
      const price: PriceData = {
        token: 'ETH',
        price: priceData as bigint || BigInt(0),
        timestamp: Date.now(),
        source: 'Chainlink',
      };
      setPrices([price]);
    }
  }, [priceData]);

  return { prices, address };
}


