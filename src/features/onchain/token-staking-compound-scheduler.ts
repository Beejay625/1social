'use client';

import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

export interface CompoundSchedule {
  stakingPoolAddress: string;
  compoundInterval: number;
  autoCompound: boolean;
  scheduleId: string;
}

export function useTokenStakingCompoundScheduler() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [schedules, setSchedules] = useState<CompoundSchedule[]>([]);

  const createSchedule = async (stakingPoolAddress: string, compoundInterval: number, autoCompound: boolean) => {
    if (!address || !isConnected) throw new Error('Reown wallet not connected');
    
    const message = `Create compound schedule for pool ${stakingPoolAddress} with ${compoundInterval}s interval`;
    await signMessageAsync({ message });
    
    const schedule: CompoundSchedule = {
      stakingPoolAddress,
      compoundInterval,
      autoCompound,
      scheduleId: `compound_${Date.now()}`,
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

