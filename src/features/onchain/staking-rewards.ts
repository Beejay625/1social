'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface StakingReward {
  amount: string;
  period: number;
  wallet: string;
  timestamp: number;
}

export function useStakingRewards() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [rewards, setRewards] = useState<StakingReward[]>([]);

  const stakeTokens = async (amount: string, period: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Stake: ${amount} for ${period} days`;
    await signMessageAsync({ message });
    
    const reward: StakingReward = {
      amount,
      period,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setRewards([...rewards, reward]);
    return reward;
  };

  return { stakeTokens, rewards, address };
}

