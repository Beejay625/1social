'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface LiquidityMining {
  pool: string;
  amount: string;
  rewards: string;
  period: number;
  wallet: string;
}

export function useLiquidityMining() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [positions, setPositions] = useState<LiquidityMining[]>([]);

  const stakeLiquidity = async (pool: string, amount: string, period: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Liquidity Mining: ${pool} ${amount} ${period} days`;
    await signMessageAsync({ message });
    
    const position: LiquidityMining = {
      pool,
      amount,
      rewards: '0',
      period,
      wallet: address,
    };
    
    setPositions([...positions, position]);
    return position;
  };

  return { stakeLiquidity, positions, address };
}

