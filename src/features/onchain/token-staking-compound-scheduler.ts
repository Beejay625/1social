'use client';

/**
 * Token Staking Compound Scheduler
 * Schedule automatic compound operations with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface CompoundSchedule {
  scheduleId: string;
  tokenAddress: string;
  stakingPool: string;
  compoundInterval: number;
  nextCompoundTime: number;
  enabled: boolean;
  timestamp: number;
}

export function useTokenStakingCompoundScheduler() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [schedules, setSchedules] = useState<CompoundSchedule[]>([]);

  const createSchedule = async (
    tokenAddress: string,
    stakingPool: string,
    compoundInterval: number
  ): Promise<CompoundSchedule> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (compoundInterval <= 0) {
      throw new Error('Compound interval must be greater than zero');
    }
    
    const message = `Create compound schedule: ${tokenAddress} every ${compoundInterval}ms`;
    await signMessageAsync({ message });
    
    const schedule: CompoundSchedule = {
      scheduleId: `compound-${Date.now()}`,
      tokenAddress,
      stakingPool,
      compoundInterval,
      nextCompoundTime: Date.now() + compoundInterval,
      enabled: true,
      timestamp: Date.now(),
    };
    
    setSchedules([...schedules, schedule]);
    return schedule;
  };

  return { createSchedule, schedules, address };
}
