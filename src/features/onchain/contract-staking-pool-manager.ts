'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface StakingPool {
  pool: string;
  token: string;
  lockPeriod: number;
  rewardRate: number;
  wallet: string;
  timestamp: number;
}

export function useContractStakingPoolManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [pools, setPools] = useState<StakingPool[]>([]);

  const createPool = async (pool: string, token: string, lockPeriod: number, rewardRate: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Create Staking Pool: ${pool} with ${rewardRate}% reward rate`;
    await signMessageAsync({ message });
    
    const stakingPool: StakingPool = {
      pool,
      token,
      lockPeriod,
      rewardRate,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setPools([...pools, stakingPool]);
    return stakingPool;
  };

  return { createPool, pools, address };
}

