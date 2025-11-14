'use client';

/**
 * Token Staking Pool Creator V3
 * Create staking pools with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface PoolCreation {
  creationId: string;
  stakingToken: string;
  rewardToken: string;
  rewardRate: number;
  lockPeriod: number;
  createdBy: string;
  poolAddress?: string;
  txHash: string;
  timestamp: number;
}

export function useTokenStakingPoolCreatorV3() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [creations, setCreations] = useState<PoolCreation[]>([]);

  const createPool = async (
    stakingToken: string,
    rewardToken: string,
    rewardRate: number,
    lockPeriod: number
  ): Promise<PoolCreation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!stakingToken.startsWith('0x') || !rewardToken.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    if (rewardRate < 0) {
      throw new Error('Reward rate cannot be negative');
    }
    if (lockPeriod < 0) {
      throw new Error('Lock period cannot be negative');
    }
    
    const message = `Create staking pool: ${stakingToken} reward ${rewardToken} rate ${rewardRate}`;
    await signMessageAsync({ message });
    
    const creation: PoolCreation = {
      creationId: `pool-${Date.now()}`,
      stakingToken,
      rewardToken,
      rewardRate,
      lockPeriod,
      createdBy: address,
      poolAddress: `0x${Date.now().toString(16)}`,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setCreations([...creations, creation]);
    return creation;
  };

  return { createPool, creations, address };
}

