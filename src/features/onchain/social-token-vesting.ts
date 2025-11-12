'use client';

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';
import { parseAbi } from 'viem';

export interface VestingSchedule {
  id: string;
  beneficiary: string;
  amount: string;
  startTime: number;
  cliff: number;
  duration: number;
  released: string;
}

export function useSocialTokenVesting(contractAddress?: string) {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContract } = useWriteContract();
  const [vestingSchedules, setVestingSchedules] = useState<VestingSchedule[]>([]);

  const createVestingSchedule = async (
    beneficiary: string,
    amount: string,
    cliff: number,
    duration: number
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Create Vesting: ${beneficiary} ${amount} ${cliff} ${duration}`;
    await signMessageAsync({ message });
    
    const schedule: VestingSchedule = {
      id: `vesting-${Date.now()}`,
      beneficiary,
      amount,
      startTime: Date.now(),
      cliff,
      duration,
      released: '0',
    };
    
    setVestingSchedules([...vestingSchedules, schedule]);
    return schedule;
  };

  return { createVestingSchedule, vestingSchedules, address };
}

