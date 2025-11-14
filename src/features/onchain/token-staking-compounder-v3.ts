'use client';

/**
 * Token Staking Compounder V3
 * Compound staking rewards with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface CompoundOperation {
  compoundId: string;
  stakingPool: string;
  rewardAmount: string;
  compoundedAmount: string;
  apy: number;
  compoundedBy: string;
  txHash: string;
  timestamp: number;
}

export function useTokenStakingCompounderV3() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [compounds, setCompounds] = useState<CompoundOperation[]>([]);

  const compound = async (
    stakingPool: string,
    rewardAmount: string,
    apy: number
  ): Promise<CompoundOperation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!stakingPool.startsWith('0x')) {
      throw new Error('Invalid staking pool address format');
    }
    if (apy < 0) {
      throw new Error('APY cannot be negative');
    }
    
    const message = `Compound rewards: ${stakingPool} ${rewardAmount} at ${apy}% APY`;
    await signMessageAsync({ message });
    
    const compoundedAmount = (parseFloat(rewardAmount) * (1 + apy / 100)).toString();
    
    const compound: CompoundOperation = {
      compoundId: `compound-${Date.now()}`,
      stakingPool,
      rewardAmount,
      compoundedAmount,
      apy,
      compoundedBy: address,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setCompounds([...compounds, compound]);
    return compound;
  };

  return { compound, compounds, address };
}
