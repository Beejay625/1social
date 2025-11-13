'use client';

/**
 * Token Vesting Scheduler
 * Create and manage token vesting schedules with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface VestingSchedule {
  scheduleId: string;
  tokenAddress: string;
  beneficiary: string;
  totalAmount: string;
  startTime: number;
  duration: number;
  cliff: number;
  createdBy: string;
  timestamp: number;
}

export function useTokenVestingScheduler() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [schedules, setSchedules] = useState<VestingSchedule[]>([]);

  const createSchedule = async (
    tokenAddress: string,
    beneficiary: string,
    totalAmount: string,
    startTime: number,
    duration: number,
    cliff: number
  ): Promise<VestingSchedule> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x') || !beneficiary.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    
    const message = `Create vesting schedule: ${tokenAddress} for ${beneficiary}`;
    await signMessageAsync({ message });
    
    const schedule: VestingSchedule = {
      scheduleId: `vest-${Date.now()}`,
      tokenAddress,
      beneficiary,
      totalAmount,
      startTime,
      duration,
      cliff,
      createdBy: address,
      timestamp: Date.now(),
    };
    
    setSchedules([...schedules, schedule]);
    return schedule;
  };

  return { createSchedule, schedules, address };
}
