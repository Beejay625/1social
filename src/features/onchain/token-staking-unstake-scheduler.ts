'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface UnstakeSchedule {
  poolAddress: string;
  amount: bigint;
  scheduleTime: number;
  cooldownPeriod: number;
}

export function useTokenStakingUnstakeScheduler() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [scheduling, setScheduling] = useState(false);

  const scheduleUnstake = async (schedule: UnstakeSchedule) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setScheduling(true);

    try {
      const message = `Schedule unstake for ${schedule.scheduleTime}`;
      await signMessageAsync({ message });

      await writeContract({
        address: schedule.poolAddress as `0x${string}`,
        abi: [],
        functionName: 'scheduleUnstake',
        args: [schedule.amount, schedule.scheduleTime, schedule.cooldownPeriod],
      });
    } finally {
      setScheduling(false);
    }
  };

  return {
    scheduleUnstake,
    scheduling,
    address,
    isConnected,
  };
}

