'use client';

/**
 * Token Staking Reward Scheduler
 * Schedule automatic reward claims with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface RewardSchedule {
  scheduleId: string;
  poolId: string;
  claimInterval: number;
  autoClaim: boolean;
  scheduledBy: string;
  timestamp: number;
}

export function useTokenStakingRewardScheduler() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [schedules, setSchedules] = useState<RewardSchedule[]>([]);

  const scheduleRewards = async (
    poolId: string,
    claimInterval: number,
    autoClaim: boolean
  ): Promise<RewardSchedule> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Schedule rewards: ${poolId} interval ${claimInterval} auto ${autoClaim}`;
    await signMessageAsync({ message });
    
    const schedule: RewardSchedule = {
      scheduleId: `schedule-${Date.now()}`,
      poolId,
      claimInterval,
      autoClaim,
      scheduledBy: address,
      timestamp: Date.now(),
    };
    
    setSchedules([...schedules, schedule]);
    return schedule;
  };

  return { scheduleRewards, schedules, address };
}
