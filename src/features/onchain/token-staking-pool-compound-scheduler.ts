'use client';

/**
 * Token Staking Pool Compound Scheduler
 * Schedule automatic compounding of staking rewards with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface CompoundSchedule {
  scheduleId: string;
  stakingPool: string;
  compoundInterval: number;
  minRewardAmount: string;
  scheduledBy: string;
  active: boolean;
  timestamp: number;
}

export function useTokenStakingPoolCompoundScheduler() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [schedules, setSchedules] = useState<CompoundSchedule[]>([]);

  const scheduleCompound = async (
    stakingPool: string,
    compoundInterval: number,
    minRewardAmount: string
  ): Promise<CompoundSchedule> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!stakingPool.startsWith('0x')) {
      throw new Error('Invalid staking pool address format');
    }
    if (compoundInterval <= 0) {
      throw new Error('Compound interval must be greater than zero');
    }
    
    const message = `Schedule compound: ${stakingPool} interval ${compoundInterval} min ${minRewardAmount}`;
    await signMessageAsync({ message });
    
    const schedule: CompoundSchedule = {
      scheduleId: `compound-${Date.now()}`,
      stakingPool,
      compoundInterval,
      minRewardAmount,
      scheduledBy: address,
      active: true,
      timestamp: Date.now(),
    };
    
    setSchedules([...schedules, schedule]);
    return schedule;
  };

  return { scheduleCompound, schedules, address };
}


