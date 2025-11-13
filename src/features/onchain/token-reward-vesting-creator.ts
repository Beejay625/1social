'use client';

/**
 * Token Reward Vesting Creator
 * Create reward vesting schedules with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RewardVesting {
  vestingId: string;
  recipient: string;
  totalAmount: string;
  startTime: number;
  endTime: number;
  cliff: number;
  createdBy: string;
  timestamp: number;
}

export function useTokenRewardVestingCreator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [vestings, setVestings] = useState<RewardVesting[]>([]);

  const create = async (
    recipient: string,
    totalAmount: string,
    startTime: number,
    endTime: number,
    cliff: number
  ): Promise<RewardVesting> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!recipient.startsWith('0x')) {
      throw new Error('Invalid recipient address format');
    }
    if (endTime <= startTime) {
      throw new Error('End time must be after start time');
    }
    
    const message = `Create reward vesting: ${recipient} ${totalAmount}`;
    await signMessageAsync({ message });
    
    const vesting: RewardVesting = {
      vestingId: `vest-${Date.now()}`,
      recipient,
      totalAmount,
      startTime,
      endTime,
      cliff,
      createdBy: address,
      timestamp: Date.now(),
    };
    
    setVestings([...vestings, vesting]);
    return vesting;
  };

  return { create, vestings, address };
}
