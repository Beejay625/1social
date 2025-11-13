'use client';

/**
 * Token Staking Reward Booster V2
 * Create reward boost multipliers with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RewardBoost {
  boostId: string;
  stakingPool: string;
  multiplier: number;
  duration: number;
  startTime: number;
  endTime: number;
  timestamp: number;
}

export function useTokenStakingRewardBoosterV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [boosts, setBoosts] = useState<RewardBoost[]>([]);

  const createBoost = async (
    stakingPool: string,
    multiplier: number,
    duration: number
  ): Promise<RewardBoost> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (multiplier <= 1) {
      throw new Error('Multiplier must be greater than 1');
    }
    if (duration <= 0) {
      throw new Error('Duration must be greater than zero');
    }
    
    const message = `Create reward boost: ${stakingPool} ${multiplier}x for ${duration}ms`;
    await signMessageAsync({ message });
    
    const boost: RewardBoost = {
      boostId: `boost-${Date.now()}`,
      stakingPool,
      multiplier,
      duration,
      startTime: Date.now(),
      endTime: Date.now() + duration,
      timestamp: Date.now(),
    };
    
    setBoosts([...boosts, boost]);
    return boost;
  };

  return { createBoost, boosts, address };
}
