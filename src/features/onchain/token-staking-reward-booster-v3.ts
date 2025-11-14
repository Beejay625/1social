'use client';

/**
 * Token Staking Reward Booster V3
 * Boost staking rewards with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface RewardBoost {
  boostId: string;
  poolId: string;
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

  const boostRewards = async (
    poolId: string,
    multiplier: number,
    duration: number
  ): Promise<RewardBoost> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (multiplier <= 0) {
      throw new Error('Multiplier must be greater than 0');
    }
    
    const message = `Boost rewards V3: ${poolId} multiplier ${multiplier}x duration ${duration}`;
    await signMessageAsync({ message });
    
    const boost: RewardBoost = {
      boostId: `boost-v3-${Date.now()}`,
      poolId,
      multiplier,
      duration,
      boostedBy: address,
      timestamp: Date.now(),
    };
    
    setBoosts([...boosts, boost]);
    return boost;
  };

  return { boostRewards, boosts, address };
}
