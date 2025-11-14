'use client';

/**
 * Token Staking Compounder
 * Compound staking rewards with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface CompoundAction {
  compoundId: string;
  poolId: string;
  rewardAmount: string;
  compoundedBy: string;
  timestamp: number;
}

export function useTokenStakingCompounder() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [compounds, setCompounds] = useState<CompoundAction[]>([]);

  const compoundRewards = async (
    poolId: string,
    rewardAmount: string
  ): Promise<CompoundAction> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Compound rewards: ${poolId} amount ${rewardAmount}`;
    await signMessageAsync({ message });
    
    const compound: CompoundAction = {
      compoundId: `compound-${Date.now()}`,
      poolId,
      rewardAmount,
      compoundedBy: address,
      timestamp: Date.now(),
    };
    
    setCompounds([...compounds, compound]);
    return compound;
  };

  return { compoundRewards, compounds, address };
}
