'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RewardDistribution {
  contract: string;
  recipients: string[];
  amounts: bigint[];
  token: string;
  wallet: string;
  timestamp: number;
}

export function useContractRewardDistributor() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [distributions, setDistributions] = useState<RewardDistribution[]>([]);

  const distributeRewards = async (contract: string, recipients: string[], amounts: bigint[], token: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Distribute Rewards: ${recipients.length} recipients on ${contract}`;
    await signMessageAsync({ message });
    
    const distribution: RewardDistribution = {
      contract,
      recipients,
      amounts,
      token,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setDistributions([...distributions, distribution]);
    return distribution;
  };

  return { distributeRewards, distributions, address };
}

