'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BurnSchedule {
  tokenAddress: string;
  amount: bigint;
  scheduleType: 'once' | 'daily' | 'weekly' | 'monthly';
  startTime: number;
  endTime?: number;
}

export function useTokenBurnSchedulerV5() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [scheduling, setScheduling] = useState(false);
  const [executing, setExecuting] = useState(false);

  const { data: scheduledBurns } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getScheduledBurns',
    args: [address],
  });

  const scheduleBurn = async (schedule: BurnSchedule) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setScheduling(true);

    try {
      const message = `Schedule burn: ${schedule.amount} tokens`;
      await signMessageAsync({ message });

      await writeContract({
        address: schedule.tokenAddress as `0x${string}`,
        abi: [],
        functionName: 'scheduleBurn',
        args: [schedule.amount, schedule.scheduleType, schedule.startTime, schedule.endTime || 0],
      });
    } finally {
      setScheduling(false);
    }
  };

  const executeBurn = async (tokenAddress: string, scheduleId: number) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setExecuting(true);

    try {
      const message = `Execute burn schedule: ${scheduleId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: tokenAddress as `0x${string}`,
        abi: [],
        functionName: 'executeScheduledBurn',
        args: [scheduleId],
      });
    } finally {
      setExecuting(false);
    }
  };

  return {
    scheduleBurn,
    executeBurn,
    scheduling,
    executing,
    address,
    isConnected,
    scheduledBurns,
  };
}

