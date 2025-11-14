'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface AirdropSchedule {
  id: string;
  token: string;
  recipients: string[];
  amounts: bigint[];
  scheduledTime: number;
  executed: boolean;
}

export function useAirdropScheduler() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [schedules, setSchedules] = useState<AirdropSchedule[]>([]);

  const scheduleAirdrop = async (token: string, recipients: string[], amounts: string[], scheduledTime: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: token as `0x${string}`,
      abi: [],
      functionName: 'scheduleAirdrop',
      args: [recipients, amounts.map(a => BigInt(a)), scheduledTime],
    });

    const schedule: AirdropSchedule = {
      id: txHash || '',
      token,
      recipients,
      amounts: amounts.map(a => BigInt(a)),
      scheduledTime,
      executed: false,
    };

    setSchedules([...schedules, schedule]);
    return txHash;
  };

  return { scheduleAirdrop, schedules, address };
}


