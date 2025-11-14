'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface VestingSchedule {
  beneficiary: string;
  amount: bigint;
  startTime: number;
  duration: number;
  created: boolean;
}

export function useVestingScheduleCreator() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [schedules, setSchedules] = useState<VestingSchedule[]>([]);

  const createSchedule = async (beneficiary: string, amount: string, startTime: number, duration: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'createVesting',
      args: [beneficiary, BigInt(amount), startTime, duration],
    });

    const schedule: VestingSchedule = {
      beneficiary,
      amount: BigInt(amount),
      startTime,
      duration,
      created: true,
    };

    setSchedules([...schedules, schedule]);
    return txHash;
  };

  return { createSchedule, schedules, address };
}


