'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface FarmingPool {
  id: string;
  creator: string;
  tokenAddress: string;
  rewardToken: string;
  apy: number;
  totalStaked: string;
  totalRewards: string;
  timestamp: number;
}

export function useSocialTokenFarming() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [pools, setPools] = useState<FarmingPool[]>([]);

  const createFarmingPool = async (
    tokenAddress: string,
    rewardToken: string,
    apy: number
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Create Farming Pool: ${tokenAddress} reward ${rewardToken} ${apy}%`;
    await signMessageAsync({ message });
    
    const pool: FarmingPool = {
      id: `farm-${Date.now()}`,
      creator: address,
      tokenAddress,
      rewardToken,
      apy,
      totalStaked: '0',
      totalRewards: '0',
      timestamp: Date.now(),
    };
    
    setPools([...pools, pool]);
    return pool;
  };

  return { createFarmingPool, pools, address };
}

