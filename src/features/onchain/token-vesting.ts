'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface VestingSchedule {
  id: string;
  recipient: string;
  amount: bigint;
  startTime: number;
  duration: number;
}

export function useTokenVesting() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [schedules, setSchedules] = useState<VestingSchedule[]>([]);

  const createVesting = async (recipient: string, amount: string, duration: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'createVesting',
      args: [recipient, BigInt(amount), duration],
    });

    const schedule: VestingSchedule = {
      id: txHash || '',
      recipient,
      amount: BigInt(amount),
      startTime: Date.now(),
      duration,
    };

    setSchedules([...schedules, schedule]);
    return txHash;
  };

  return { createVesting, schedules, address };
}

