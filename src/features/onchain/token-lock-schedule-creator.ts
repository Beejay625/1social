'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface LockSchedule {
  token: string;
  amount: bigint;
  unlockTime: number;
  created: boolean;
}

export function useTokenLockScheduleCreator() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [schedules, setSchedules] = useState<LockSchedule[]>([]);

  const createLockSchedule = async (token: string, amount: string, unlockTime: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: token as `0x${string}`,
      abi: [],
      functionName: 'lock',
      args: [BigInt(amount), unlockTime],
    });

    const schedule: LockSchedule = {
      token,
      amount: BigInt(amount),
      unlockTime,
      created: true,
    };

    setSchedules([...schedules, schedule]);
    return txHash;
  };

  return { createLockSchedule, schedules, address };
}

