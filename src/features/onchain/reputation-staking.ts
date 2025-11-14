'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ReputationStake {
  target: string;
  amount: string;
  stakeType: 'positive' | 'negative';
  wallet: string;
}

export function useReputationStaking() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [stakes, setStakes] = useState<ReputationStake[]>([]);

  const stakeReputation = async (target: string, amount: string, stakeType: 'positive' | 'negative') => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Reputation Stake: ${target} ${amount} ${stakeType}`;
    await signMessageAsync({ message });
    
    const stake: ReputationStake = {
      target,
      amount,
      stakeType,
      wallet: address,
    };
    
    setStakes([...stakes, stake]);
    return stake;
  };

  return { stakeReputation, stakes, address };
}


