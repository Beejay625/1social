'use client';

/**
 * Token Burn Scheduler V3
 * Advanced burn scheduling with multiple strategies via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BurnSchedule {
  scheduleId: string;
  tokenAddress: string;
  amount: string;
  strategy: 'one-time' | 'recurring' | 'percentage' | 'threshold';
  scheduleTime: number;
  interval?: number;
  threshold?: string;
  enabled: boolean;
  timestamp: number;
}

export function useTokenBurnSchedulerV3() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [schedules, setSchedules] = useState<BurnSchedule[]>([]);

  const createSchedule = async (
    tokenAddress: string,
    amount: string,
    strategy: 'one-time' | 'recurring' | 'percentage' | 'threshold',
    scheduleTime: number,
    interval?: number,
    threshold?: string
  ): Promise<BurnSchedule> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (strategy === 'recurring' && (!interval || interval <= 0)) {
      throw new Error('Interval is required for recurring strategy');
    }
    if (strategy === 'threshold' && !threshold) {
      throw new Error('Threshold is required for threshold strategy');
    }
    
    const message = `Create burn schedule: ${tokenAddress} ${strategy} strategy`;
    await signMessageAsync({ message });
    
    const schedule: BurnSchedule = {
      scheduleId: `burn-${Date.now()}`,
      tokenAddress,
      amount,
      strategy,
      scheduleTime,
      interval,
      threshold,
      enabled: true,
      timestamp: Date.now(),
    };
    
    setSchedules([...schedules, schedule]);
    return schedule;
  };

  return { createSchedule, schedules, address };
}

