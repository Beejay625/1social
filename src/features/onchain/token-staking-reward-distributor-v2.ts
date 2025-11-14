'use client';

/**
 * Token Staking Reward Distributor V2
 * Distribute staking rewards with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface RewardDistribution {
  distributionId: string;
  stakingPool: string;
  totalRewards: string;
  recipients: string[];
  amounts: string[];
  distributedBy: string;
  timestamp: number;
}

export function useTokenStakingRewardDistributorV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
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
    
    const message = `Distribute rewards V2: ${stakingPool} to ${recipients.length} recipients`;
    await signMessageAsync({ message });
    
    const distribution: RewardDistribution = {
      distributionId: `dist-v2-${Date.now()}`,
      stakingPool,
      totalRewards,
      recipients,
      amounts,
      distributedBy: address,
      timestamp: Date.now(),
    };
    
    setDistributions([...distributions, distribution]);
    return distribution;
  };

  return { distribute, distributions, address };
}

