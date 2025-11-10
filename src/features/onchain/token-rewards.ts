'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TokenReward {
  recipient: string;
  amount: string;
  token: string;
  txHash: string;
}

export function useTokenRewards() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [rewards, setRewards] = useState<TokenReward[]>([]);

  const distributeReward = async (recipient: string, amount: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Reward: ${recipient} ${amount}`;
    await signMessageAsync({ message });
    
    const reward: TokenReward = {
      recipient,
      amount,
      token: 'ETH',
      txHash: `0x${Date.now().toString(16)}`,
    };
    
    setRewards([...rewards, reward]);
    return reward;
  };

  return { distributeReward, rewards, address };
}

