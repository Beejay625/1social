'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface VestingSchedule {
  recipient: string;
  amount: string;
  startDate: number;
  duration: number;
  wallet: string;
}

export function useTokenVesting() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [schedules, setSchedules] = useState<VestingSchedule[]>([]);

  const createVesting = async (recipient: string, amount: string, duration: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Vesting: ${recipient} ${amount} ${duration} days`;
    await signMessageAsync({ message });
    
    const schedule: VestingSchedule = {
      recipient,
      amount,
      startDate: Date.now(),
      duration,
      wallet: address,
    };
    
    setSchedules([...schedules, schedule]);
    return schedule;
  };

  return { createVesting, schedules, address };
}
