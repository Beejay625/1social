'use client';

/**
 * Token Staking Pool Unstake Scheduler
 * Schedule automatic unstaking with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface UnstakeSchedule {
  scheduleId: string;
  stakingPool: string;
  unstakeTime: number;
  amount: string;
  scheduledBy: string;
  active: boolean;
  timestamp: number;
}

export function useTokenStakingPoolUnstakeScheduler() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [schedules, setSchedules] = useState<UnstakeSchedule[]>([]);

  const scheduleUnstake = async (
    stakingPool: string,
    unstakeTime: number,
    amount: string
  ): Promise<UnstakeSchedule> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!stakingPool.startsWith('0x')) {
      throw new Error('Invalid staking pool address format');
    }
    if (unstakeTime <= Date.now()) {
      throw new Error('Unstake time must be in the future');
    }
    
    const message = `Schedule unstake: ${stakingPool} at ${unstakeTime} amount ${amount}`;
    await signMessageAsync({ message });
    
    const schedule: UnstakeSchedule = {
      scheduleId: `unstake-${Date.now()}`,
      stakingPool,
      unstakeTime,
      amount,
      scheduledBy: address,
      active: true,
      timestamp: Date.now(),
    };
    
    setSchedules([...schedules, schedule]);
    return schedule;
  };

  return { scheduleUnstake, schedules, address };
}

