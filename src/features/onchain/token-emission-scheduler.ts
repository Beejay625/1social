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
  amount: string;
  emissionTime: number;
  recipient: string;
  interval?: number;
  active: boolean;
  createdBy: string;
  timestamp: number;
}

export function useTokenEmissionScheduler() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [schedules, setSchedules] = useState<EmissionSchedule[]>([]);

  const schedule = async (
    tokenAddress: string,
    amount: string,
    emissionTime: number,
    recipient: string,
    interval?: number
  ): Promise<EmissionSchedule> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    if (!recipient.startsWith('0x')) {
      throw new Error('Invalid recipient address format');
    }
    
    const message = `Schedule emission: ${tokenAddress} ${amount} to ${recipient}`;
    await signMessageAsync({ message });
    
    const schedule: EmissionSchedule = {
      scheduleId: `emit-${Date.now()}`,
      tokenAddress,
      amount,
      emissionTime,
      recipient,
      interval,
      active: true,
      createdBy: address,
      timestamp: Date.now(),
    };
    
    setSchedules([...schedules, schedule]);
    return schedule;
  };

  return { schedule, schedules, address };
}
