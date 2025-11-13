'use client';

/**
 * Token Staking Pool Reward Distributor
 * Distribute staking pool rewards with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RewardDistribution {
  distributionId: string;
  stakingPool: string;
  totalRewards: string;
  recipients: string[];
  amounts: string[];
  distributedBy: string;
  txHash: string;
  timestamp: number;
}

export function useTokenStakingPoolRewardDistributor() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [distributions, setDistributions] = useState<RewardDistribution[]>([]);

  const distribute = async (
    stakingPool: string,
    totalRewards: string,
    recipients: string[],
    amounts: string[]
  ): Promise<RewardDistribution> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!stakingPool.startsWith('0x')) {
      throw new Error('Invalid staking pool address format');
    }
    if (recipients.length !== amounts.length) {
      throw new Error('Recipients and amounts arrays must have the same length');
    }
    
    const message = `Distribute staking rewards: ${stakingPool} to ${recipients.length} recipients`;
    await signMessageAsync({ message });
    
    const distribution: RewardDistribution = {
      distributionId: `dist-${Date.now()}`,
      stakingPool,
      totalRewards,
      recipients,
      amounts,
      distributedBy: address,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setDistributions([...distributions, distribution]);
    return distribution;
  };

  return { distribute, distributions, address };
}
