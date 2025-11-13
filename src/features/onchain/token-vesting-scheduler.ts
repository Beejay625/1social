'use client';

import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

export interface VestingSchedule {
  beneficiary: string;
  tokenAddress: string;
  totalAmount: string;
  startTime: number;
  duration: number;
  cliff: number;
  scheduleId: string;
}

export function useTokenVestingScheduler() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [schedules, setSchedules] = useState<VestingSchedule[]>([]);

  const createSchedule = async (
    beneficiary: string,
    tokenAddress: string,
    totalAmount: string,
    startTime: number,
    duration: number,
    cliff: number
  ) => {
    if (!address || !isConnected) throw new Error('Reown wallet not connected');
    
    const message = `Create vesting schedule: ${totalAmount} tokens for ${beneficiary}`;
    await signMessageAsync({ message });
    
    const schedule: VestingSchedule = {
      beneficiary,
      tokenAddress,
      totalAmount,
      startTime,
      duration,
      cliff,
      scheduleId: `vest_${Date.now()}`,
    };
    
    setSchedules([...schedules, schedule]);
    return schedule;
  };

  return { 
    createSchedule, 
    schedules, 
    address, 
    isConnected,
    hash,
    isPending,
    isConfirming,
    isConfirmed
  };
}

