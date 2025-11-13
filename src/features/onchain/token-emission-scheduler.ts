'use client';

/**
 * Token Emission Scheduler
 * Schedule token emissions with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface EmissionSchedule {
  scheduleId: string;
  tokenAddress: string;
  emissionRate: string;
  startTime: number;
  endTime: number;
  recipient: string;
  createdBy: string;
  active: boolean;
  timestamp: number;
}

export function useTokenEmissionScheduler() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [schedules, setSchedules] = useState<EmissionSchedule[]>([]);

  const createSchedule = async (
    tokenAddress: string,
    emissionRate: string,
    startTime: number,
    endTime: number,
    recipient: string
  ): Promise<EmissionSchedule> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x') || !recipient.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    if (endTime <= startTime) {
      throw new Error('End time must be after start time');
    }
    
    const message = `Create emission schedule: ${tokenAddress} ${emissionRate}/second`;
    await signMessageAsync({ message });
    
    const schedule: EmissionSchedule = {
      scheduleId: `emission-${Date.now()}`,
      tokenAddress,
      emissionRate,
      startTime,
      endTime,
      recipient,
      createdBy: address,
      active: true,
      timestamp: Date.now(),
    };
    
    setSchedules([...schedules, schedule]);
    return schedule;
  };

  return { createSchedule, schedules, address };
}
