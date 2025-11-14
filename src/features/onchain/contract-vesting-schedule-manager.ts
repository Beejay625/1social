'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface VestingSchedule {
  beneficiary: string;
  token: string;
  totalAmount: bigint;
  startTime: number;
  duration: number;
  wallet: string;
  timestamp: number;
}

export function useContractVestingScheduleManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [schedules, setSchedules] = useState<VestingSchedule[]>([]);

  const createSchedule = async (beneficiary: string, token: string, totalAmount: bigint, startTime: number, duration: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Create Vesting Schedule: ${beneficiary} for ${totalAmount} ${token}`;
    await signMessageAsync({ message });
    
    const schedule: VestingSchedule = {
      beneficiary,
      token,
      totalAmount,
      startTime,
      duration,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setSchedules([...schedules, schedule]);
    return schedule;
  };

  return { createSchedule, schedules, address };
}


