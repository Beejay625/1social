'use client';

/**
 * Token Reward Vesting Creator
 * Create reward vesting schedules with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RewardVesting {
  vestingId: string;
  tokenAddress: string;
  beneficiary: string;
  totalReward: string;
  startTime: number;
  duration: number;
  cliff: number;
  createdBy: string;
  timestamp: number;
}

export function useTokenRewardVestingCreator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [vestings, setVestings] = useState<RewardVesting[]>([]);

  const createVesting = async (
    tokenAddress: string,
    beneficiary: string,
    totalReward: string,
    startTime: number,
    duration: number,
    cliff: number
  ): Promise<RewardVesting> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x') || !beneficiary.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    if (cliff > duration) {
      throw new Error('Cliff period cannot exceed duration');
    }
    
    const message = `Create reward vesting: ${tokenAddress} for ${beneficiary}`;
    await signMessageAsync({ message });
    
    const vesting: RewardVesting = {
      vestingId: `vest-${Date.now()}`,
      tokenAddress,
      beneficiary,
      totalReward,
      startTime,
      duration,
      cliff,
      createdBy: address,
      timestamp: Date.now(),
    };
    
    setVestings([...vestings, vesting]);
    return vesting;
  };

  return { createVesting, vestings, address };
}
