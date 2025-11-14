'use client';

/**
 * Token Staking Reward Claim Scheduler
 * Schedule automatic reward claims with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface ClaimSchedule {
  scheduleId: string;
  stakingPool: string;
  claimInterval: number;
  autoCompound: boolean;
  scheduledBy: string;
  active: boolean;
  timestamp: number;
}

export function useTokenStakingRewardClaimScheduler() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [schedules, setSchedules] = useState<ClaimSchedule[]>([]);

  const scheduleClaim = async (
    stakingPool: string,
    claimInterval: number,
    autoCompound: boolean
  ): Promise<ClaimSchedule> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!stakingPool.startsWith('0x')) {
      throw new Error('Invalid staking pool address format');
    }
    if (claimInterval <= 0) {
      throw new Error('Claim interval must be greater than zero');
    }
    
    const message = `Schedule claim: ${stakingPool} interval ${claimInterval} auto ${autoCompound}`;
    await signMessageAsync({ message });
    
    const schedule: ClaimSchedule = {
      scheduleId: `claim-${Date.now()}`,
      stakingPool,
      claimInterval,
      autoCompound,
      scheduledBy: address,
      active: true,
      timestamp: Date.now(),
    };
    
    setSchedules([...schedules, schedule]);
    return schedule;
  };

  return { scheduleClaim, schedules, address };
}

