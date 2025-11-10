'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface StakingPool {
  id: string;
  token: string;
  rewardToken: string;
  apy: number;
  poolAddress: string;
}

export function useStakingPoolCreator() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [pools, setPools] = useState<StakingPool[]>([]);

  const createPool = async (token: string, rewardToken: string, apy: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'createPool',
      args: [token, rewardToken, apy * 100],
    });

    const pool: StakingPool = {
      id: txHash || '',
      token,
      rewardToken,
      apy,
      poolAddress: `0x${Date.now().toString(16)}`,
    };

    setPools([...pools, pool]);
    return txHash;
  };

  return { createPool, pools, address };
}

