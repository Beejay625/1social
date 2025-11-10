'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface VestingPeriod {
  recipient: string;
  totalAmount: string;
  startDate: number;
  endDate: number;
  released: string;
  wallet: string;
}

export function useVestingSchedule() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [schedules, setSchedules] = useState<VestingPeriod[]>([]);

  const createSchedule = async (recipient: string, totalAmount: string, duration: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Vesting Schedule: ${recipient} ${totalAmount} ${duration} days`;
    await signMessageAsync({ message });
    
    const schedule: VestingPeriod = {
      recipient,
      totalAmount,
      startDate: Date.now(),
      endDate: Date.now() + duration * 24 * 60 * 60 * 1000,
      released: '0',
      wallet: address,
    };
    
    setSchedules([...schedules, schedule]);
    return schedule;
  };

  return { createSchedule, schedules, address };
}
