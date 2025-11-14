'use client';

/**
 * Token Staking Pool Reward Rate Manager
 * Manage staking pool reward rates with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface RewardRateManagement {
  managementId: string;
  stakingPool: string;
  newRewardRate: number;
  action: 'increase' | 'decrease' | 'set';
  managedBy: string;
  timestamp: number;
}

export function useTokenStakingPoolRewardRateManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [managements, setManagements] = useState<RewardRateManagement[]>([]);

  const manageRewardRate = async (
    stakingPool: string,
    newRewardRate: number,
    action: 'increase' | 'decrease' | 'set'
  ): Promise<RewardRateManagement> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!stakingPool.startsWith('0x')) {
      throw new Error('Invalid staking pool address format');
    }
    if (newRewardRate < 0) {
      throw new Error('Reward rate cannot be negative');
    }
    
    const message = `Manage reward rate: ${stakingPool} ${action} to ${newRewardRate}%`;
    await signMessageAsync({ message });
    
    const management: RewardRateManagement = {
      managementId: `rate-${Date.now()}`,
      stakingPool,
      newRewardRate,
      action,
      managedBy: address,
      timestamp: Date.now(),
    };
    
    setManagements([...managements, management]);
    return management;
  };

  return { manageRewardRate, managements, address };
}

