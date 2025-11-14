'use client';

/**
 * Token Staking Reward Scheduler
 * Schedule automatic reward claims with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RewardSchedule {
  scheduleId: string;
  stakingPool: string;
  claimInterval: number;
  autoCompound: boolean;
  active: boolean;
  createdBy: string;
  timestamp: number;
}

export function useTokenStakingRewardScheduler() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [schedules, setSchedules] = useState<RewardSchedule[]>([]);

  const createSchedule = async (
    stakingPool: string,
    claimInterval: number,
    autoCompound: boolean
  ): Promise<RewardSchedule> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!stakingPool.startsWith('0x')) {
      throw new Error('Invalid staking pool address format');
    }
    if (claimInterval <= 0) {
      throw new Error('Claim interval must be greater than zero');
    }
    
    const message = `Create reward schedule: ${stakingPool} interval ${claimInterval} seconds`;
    await signMessageAsync({ message });
    
    const schedule: RewardSchedule = {
      scheduleId: `schedule-${Date.now()}`,
      stakingPool,
      claimInterval,
      autoCompound,
      active: true,
      createdBy: address,
      timestamp: Date.now(),
    };
    
    setSchedules([...schedules, schedule]);
    return schedule;
  };

  return { createSchedule, schedules, address };
}

