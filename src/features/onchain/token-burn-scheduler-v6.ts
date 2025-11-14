'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BurnSchedule {
  amount: bigint;
  timestamp: number;
  recurring: boolean;
  interval?: number;
}

export function useTokenBurnSchedulerV6() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [scheduling, setScheduling] = useState(false);

  const schedule = async (tokenAddress: string, schedule: BurnSchedule) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setScheduling(true);

    try {
      const message = `Schedule token burn: ${schedule.amount} at ${new Date(schedule.timestamp).toISOString()}`;
      await signMessageAsync({ message });

      await writeContract({
        address: tokenAddress as `0x${string}`,
        abi: [],
        functionName: 'scheduleBurn',
        args: [schedule.amount, schedule.timestamp, schedule.recurring, schedule.interval || 0],
      });
    } finally {
      setScheduling(false);
    }
  };

  return {
    schedule,
    scheduling,
    address,
    isConnected,
  };
}

