'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface StakingPool {
  id: string;
  creator: string;
  tokenAddress: string;
  apy: number;
  lockPeriod: number;
  totalStaked: string;
  participants: number;
}

export function useSocialStakingPools() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [pools, setPools] = useState<StakingPool[]>([]);

  const createPool = async (
    tokenAddress: string,
    apy: number,
    lockPeriod: number
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Create Pool: ${tokenAddress} ${apy}% ${lockPeriod}`;
    await signMessageAsync({ message });
    
    const pool: StakingPool = {
      id: `pool-${Date.now()}`,
      creator: address,
      tokenAddress,
      apy,
      lockPeriod,
      totalStaked: '0',
      participants: 0,
    };
    
    setPools([...pools, pool]);
    return pool;
  };

  return { createPool, pools, address };
}

