'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RewardsPool {
  id: string;
  creator: string;
  tokenAddress: string;
  rewardToken: string;
  totalRewards: string;
  distributed: string;
  startTime: number;
  endTime: number;
  active: boolean;
}

export function useSocialTokenRewardsPool() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [pools, setPools] = useState<RewardsPool[]>([]);

  const createRewardsPool = async (
    tokenAddress: string,
    rewardToken: string,
    totalRewards: string,
    endTime: number
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Create Rewards Pool: ${tokenAddress} reward ${rewardToken} ${totalRewards}`;
    await signMessageAsync({ message });
    
    const pool: RewardsPool = {
      id: `rewards-pool-${Date.now()}`,
      creator: address,
      tokenAddress,
      rewardToken,
      totalRewards,
      distributed: '0',
      startTime: Date.now(),
      endTime,
      active: true,
    };
    
    setPools([...pools, pool]);
    return pool;
  };

  return { createRewardsPool, pools, address };
}

