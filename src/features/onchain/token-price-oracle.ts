'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface TokenPrice {
  token: string;
  price: bigint;
  decimals: number;
  updatedAt: number;
}

export function useTokenPriceOracle() {
  const { address } = useAccount();
  const { data: price } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getPrice',
  });
  const [prices, setPrices] = useState<TokenPrice[]>([]);

  useEffect(() => {
    if (!address || !price) return;
    
    const tokenPrice: TokenPrice = {
      token: 'ETH',
      price: BigInt(price as string),
      decimals: 18,
      updatedAt: Date.now(),
    };
    
    setPrices([tokenPrice]);
  }, [address, price]);

  return { prices, address };
}


