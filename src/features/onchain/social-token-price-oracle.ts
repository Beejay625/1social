'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface PriceData {
  id: string;
  tokenAddress: string;
  price: string;
  currency: string;
  source: string;
  timestamp: number;
  blockNumber: number;
}

export function useSocialTokenPriceOracle() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [prices, setPrices] = useState<PriceData[]>([]);

  const updatePrice = async (
    tokenAddress: string,
    price: string,
    currency: string,
    source: string,
    blockNumber: number
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Update Price: ${tokenAddress} ${price} ${currency} from ${source}`;
    await signMessageAsync({ message });
    
    const priceData: PriceData = {
      id: `price-${Date.now()}`,
      tokenAddress,
      price,
      currency,
      source,
      timestamp: Date.now(),
      blockNumber,
    };
    
    setPrices([...prices.filter(p => p.tokenAddress !== tokenAddress || p.currency !== currency), priceData]);
    return priceData;
  };

  return { updatePrice, prices, address };
}

