'use client';

/**
 * Token Burn Scheduler V2
 * Advanced burn scheduling with recurring options via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BurnSchedule {
  scheduleId: string;
  tokenAddress: string;
  amount: string;
  scheduleType: 'one-time' | 'recurring';
  interval?: number;
  nextBurnTime: number;
  enabled: boolean;
  timestamp: number;
}

export function useTokenBurnSchedulerV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [schedules, setSchedules] = useState<BurnSchedule[]>([]);

  const createSchedule = async (
    tokenAddress: string,
    amount: string,
    scheduleType: 'one-time' | 'recurring',
    nextBurnTime: number,
    interval?: number
  ): Promise<BurnSchedule> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (scheduleType === 'recurring' && (!interval || interval <= 0)) {
      throw new Error('Interval is required for recurring schedules');
    }
    
    const message = `Create burn schedule: ${tokenAddress} ${scheduleType}`;
    await signMessageAsync({ message });
    
    const schedule: BurnSchedule = {
      scheduleId: `burn-${Date.now()}`,
      tokenAddress,
      amount,
      scheduleType,
      interval,
      nextBurnTime,
      enabled: true,
      timestamp: Date.now(),
    };
    
    setSchedules([...schedules, schedule]);
    return schedule;
  };

  return { createSchedule, schedules, address };
}
