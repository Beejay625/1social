'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Reward {
  recipient: string;
  amount: string;
  token: string;
  reason: string;
  wallet: string;
  timestamp: number;
}

export function useTokenRewards() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [rewards, setRewards] = useState<Reward[]>([]);

  const distributeReward = async (recipient: string, amount: string, token: string, reason: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Reward: ${recipient} ${amount} ${token} for ${reason}`;
    await signMessageAsync({ message });
    
    const reward: Reward = {
      recipient,
      amount,
      token,
      reason,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setRewards([...rewards, reward]);
    return reward;
  };

  return { distributeReward, rewards, address };
}
