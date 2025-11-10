'use client';

import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';

export interface GasPriceData {
  chain: string;
  fast: string;
  standard: string;
  slow: string;
}

export function useGasPriceMonitor() {
  const { address } = useAccount();
  const [prices, setPrices] = useState<GasPriceData | null>(null);

  useEffect(() => {
    if (!address) return;
    
    const updatePrices = () => {
      setPrices({
        chain: 'ethereum',
        fast: '50',
        standard: '30',
        slow: '20',
      });
    };
    
    updatePrices();
    const interval = setInterval(updatePrices, 60000);
    return () => clearInterval(interval);
  }, [address]);

  return { prices, address };
}
