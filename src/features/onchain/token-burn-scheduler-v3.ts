'use client';

/**
 * Token Burn Scheduler V3
 * Advanced burn scheduling with recurring options via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BurnSchedule {
  scheduleId: string;
  tokenAddress: string;
  amount: string;
  scheduleType: 'one-time' | 'recurring';
  burnTime: number;
  interval?: number;
  active: boolean;
  createdBy: string;
  timestamp: number;
}

export function useTokenBurnSchedulerV3() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [schedules, setSchedules] = useState<BurnSchedule[]>([]);

  const createSchedule = async (
    tokenAddress: string,
    amount: string,
    scheduleType: 'one-time' | 'recurring',
    burnTime: number,
    interval?: number
  ): Promise<BurnSchedule> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    if (scheduleType === 'recurring' && (!interval || interval <= 0)) {
      throw new Error('Interval is required for recurring schedules');
    }
    
    const message = `Create burn schedule: ${tokenAddress} ${scheduleType} ${amount}`;
    await signMessageAsync({ message });
    
    const schedule: BurnSchedule = {
      scheduleId: `burn-${Date.now()}`,
      tokenAddress,
      amount,
      scheduleType,
      burnTime,
      interval,
      active: true,
      createdBy: address,
      timestamp: Date.now(),
    };
    
    setSchedules([...schedules, schedule]);
    return schedule;
  };

  return { createSchedule, schedules, address };
}
