'use client';

/**
 * Token Staking Reward Booster V3
 * Boost staking rewards with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface RewardBoost {
  boostId: string;
  stakingPool: string;
  multiplier: number;
  duration: number;
  boostedBy: string;
  timestamp: number;
}

export function useTokenStakingRewardBoosterV3() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [boosts, setBoosts] = useState<RewardBoost[]>([]);

  const createBoost = async (
    stakingPool: string,
    multiplier: number,
    duration: number
  ): Promise<RewardBoost> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!stakingPool.startsWith('0x')) {
      throw new Error('Invalid staking pool address format');
    }
    if (multiplier <= 0) {
      throw new Error('Multiplier must be greater than zero');
    }
    if (duration <= 0) {
      throw new Error('Duration must be greater than zero');
    }
    
    const message = `Create reward boost V3: ${stakingPool} multiplier ${multiplier}x`;
    await signMessageAsync({ message });
    
    const boost: RewardBoost = {
      boostId: `boost-v3-${Date.now()}`,
      stakingPool,
      multiplier,
      duration,
      boostedBy: address,
      timestamp: Date.now(),
    };
    
    setBoosts([...boosts, boost]);
    return boost;
  };

  return { createBoost, boosts, address };
}

