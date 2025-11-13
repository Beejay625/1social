'use client';

/**
 * Token Staking Pool Creator
 * Create new staking pools with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface StakingPool {
  poolId: string;
  tokenAddress: string;
  apy: number;
  lockPeriod: number;
  minStake: string;
  maxStake: string;
  createdBy: string;
  timestamp: number;
}

export function useTokenStakingPoolCreator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [pools, setPools] = useState<StakingPool[]>([]);

  const createPool = async (
    tokenAddress: string,
    apy: number,
    lockPeriod: number,
    minStake: string,
    maxStake: string
  ): Promise<StakingPool> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    if (apy <= 0 || lockPeriod <= 0) {
      throw new Error('APY and lock period must be greater than zero');
    }
    
    const message = `Create staking pool: ${tokenAddress} ${apy}% APY`;
    await signMessageAsync({ message });
    
    const pool: StakingPool = {
      poolId: `pool-${Date.now()}`,
      tokenAddress,
      apy,
      lockPeriod,
      minStake,
      maxStake,
      createdBy: address,
      timestamp: Date.now(),
    };
    
    setPools([...pools, pool]);
    return pool;
  };

  return { createPool, pools, address };
}

