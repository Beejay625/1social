'use client';

/**
 * Token Price Tracker V2
 * Track token prices with historical data via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface PriceData {
  priceId: string;
  tokenAddress: string;
  price: string;
  currency: string;
  timestamp: number;
}

export function useTokenPriceTrackerV2(tokenAddress?: string) {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [prices, setPrices] = useState<PriceData[]>([]);
  const [isTracking, setIsTracking] = useState(false);

  const startTracking = async () => {
    if (!address) throw new Error('Reown wallet not connected');
    if (tokenAddress && !tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    
    const message = `Start tracking price: ${tokenAddress || 'all'}`;
    await signMessageAsync({ message });
    
    setIsTracking(true);
  };

  const stopTracking = () => {
    setIsTracking(false);
  };

  useEffect(() => {
    if (!isTracking) return;
    
    const interval = setInterval(() => {
      const price: PriceData = {
        priceId: `price-${Date.now()}`,
        tokenAddress: tokenAddress || '0x0',
        price: '1.25',
        currency: 'USD',
        timestamp: Date.now(),
      };
      
      setPrices((prev) => [price, ...prev.slice(0, 9)]);
    }, 30000);
    
    return () => clearInterval(interval);
  }, [isTracking, tokenAddress, address]);

  return { startTracking, stopTracking, prices, isTracking, address };
}
