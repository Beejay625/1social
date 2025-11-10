'use client';

import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';

export interface YieldPosition {
  protocol: string;
  apy: number;
  balance: string;
  wallet: string;
}

export function useDeFiYieldTracker() {
  const { address } = useAccount();
  const [positions, setPositions] = useState<YieldPosition[]>([]);

  useEffect(() => {
    if (!address) return;
    
    const position: YieldPosition = {
      protocol: 'compound',
      apy: 5.2,
      balance: '0',
      wallet: address,
    };
    
    setPositions([position]);
  }, [address]);

  return { positions, address };
}
