'use client';

import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';

export interface GasPrice {
  chain: string;
  price: string;
  timestamp: number;
}

export function useGasTracker() {
  const { address } = useAccount();
  const [gasPrices, setGasPrices] = useState<GasPrice[]>([]);

  useEffect(() => {
    if (!address) return;
    
    const updateGasPrice = () => {
      const price: GasPrice = {
        chain: 'ethereum',
        price: (Math.random() * 100).toFixed(2),
        timestamp: Date.now(),
      };
      setGasPrices([...gasPrices, price]);
    };
    
    const interval = setInterval(updateGasPrice, 30000);
    return () => clearInterval(interval);
  }, [address, gasPrices]);

  return { gasPrices, address };
}

