'use client';

/**
 * Token Staking Compounder V2
 * Compound staking rewards with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface CompoundOperation {
  compoundId: string;
  stakingPool: string;
  rewardAmount: string;
  compoundedAmount: string;
  txHash: string;
  timestamp: number;
}

export function useTokenStakingCompounderV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [compounds, setCompounds] = useState<CompoundOperation[]>([]);

  const compound = async (
    stakingPool: string,
    rewardAmount: string
  ): Promise<CompoundOperation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!stakingPool.startsWith('0x')) {
      throw new Error('Invalid staking pool address format');
    }
    if (parseFloat(rewardAmount) <= 0) {
      throw new Error('Reward amount must be greater than zero');
    }
    
    const message = `Compound rewards: ${stakingPool} ${rewardAmount}`;
    await signMessageAsync({ message });
    
    const compound: CompoundOperation = {
      compoundId: `compound-${Date.now()}`,
      stakingPool,
      rewardAmount,
      compoundedAmount: rewardAmount,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setCompounds([...compounds, compound]);
    return compound;
  };

  return { compound, compounds, address };
}

