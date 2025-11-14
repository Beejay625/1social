'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface LiquidityPool {
  id: string;
  creator: string;
  tokenA: string;
  tokenB: string;
  amountA: string;
  amountB: string;
  liquidity: string;
  timestamp: number;
}

export function useSocialTokenLiquidityPools() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [pools, setPools] = useState<LiquidityPool[]>([]);

  const createPool = async (
    tokenA: string,
    tokenB: string,
    amountA: string,
    amountB: string
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Create Liquidity Pool: ${tokenA}/${tokenB} ${amountA}/${amountB}`;
    await signMessageAsync({ message });
    
    const pool: LiquidityPool = {
      id: `pool-${Date.now()}`,
      creator: address,
      tokenA,
      tokenB,
      amountA,
      amountB,
      liquidity: (BigInt(amountA) * BigInt(amountB)).toString(),
      timestamp: Date.now(),
    };
    
    setPools([...pools, pool]);
    return pool;
  };

  return { createPool, pools, address };
}


