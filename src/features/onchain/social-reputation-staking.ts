'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ReputationStake {
  id: string;
  staker: string;
  target: string;
  amount: string;
  stakeType: 'positive' | 'negative';
  timestamp: number;
  locked: boolean;
}

export function useSocialReputationStaking() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [stakes, setStakes] = useState<ReputationStake[]>([]);

  const stakeReputation = async (
    target: string,
    amount: string,
    stakeType: 'positive' | 'negative'
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Stake Reputation: ${target} ${amount} ${stakeType}`;
    await signMessageAsync({ message });
    
    const stake: ReputationStake = {
      id: `stake-${Date.now()}`,
      staker: address,
      target,
      amount,
      stakeType,
      timestamp: Date.now(),
      locked: true,
    };
    
    setStakes([...stakes, stake]);
    return stake;
  };

  return { stakeReputation, stakes, address };
}

