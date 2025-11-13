'use client';

/**
 * Token Staking Reward Claimer
 * Claim staking rewards with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RewardClaim {
  claimId: string;
  stakingPool: string;
  rewardAmount: string;
  txHash: string;
  timestamp: number;
}

export function useTokenStakingRewardClaimer() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [claims, setClaims] = useState<RewardClaim[]>([]);

  const claimRewards = async (
    stakingPool: string,
    rewardAmount: string
  ): Promise<RewardClaim> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!stakingPool.startsWith('0x')) {
      throw new Error('Invalid staking pool address format');
    }
    if (parseFloat(rewardAmount) <= 0) {
      throw new Error('Reward amount must be greater than zero');
    }
    
    const message = `Claim rewards: ${stakingPool} ${rewardAmount}`;
    await signMessageAsync({ message });
    
    const claim: RewardClaim = {
      claimId: `claim-${Date.now()}`,
      stakingPool,
      rewardAmount,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setClaims([...claims, claim]);
    return claim;
  };

  return { claimRewards, claims, address };
}

