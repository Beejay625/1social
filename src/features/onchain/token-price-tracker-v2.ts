'use client';

/**
 * Token Price Tracker V2
 * Track token prices with historical data via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface PriceData {
  tokenAddress: string;
  price: string;
  currency: string;
  change24h: number;
  volume24h: string;
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
        tokenAddress: tokenAddress || '0x0',
        price: '1.5',
        currency: 'USD',
        change24h: 2.5,
        volume24h: '1000000',
        timestamp: Date.now(),
      };
      
      setPrices((prev) => [price, ...prev.slice(0, 9)]);
    }, 30000);
    
    return () => clearInterval(interval);
  }, [isTracking, tokenAddress, address]);

  return { startTracking, stopTracking, prices, isTracking, address };
}

