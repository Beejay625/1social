'use client';

import { useAccount } from 'wagmi';
import { useState } from 'react';

export interface LiquidityPosition {
  pool: string;
  tokens: string[];
  share: number;
  wallet: string;
}

export function useLiquidityPoolTracker() {
  const { address } = useAccount();
  const [positions, setPositions] = useState<LiquidityPosition[]>([]);

  const addPosition = async (pool: string, tokens: string[], share: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const position: LiquidityPosition = {
      pool,
      tokens,
      share,
      wallet: address,
    };
    
    setPositions([...positions, position]);
    return position;
  };

  return { addPosition, positions, address };
}
