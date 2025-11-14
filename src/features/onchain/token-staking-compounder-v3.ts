'use client';

/**
 * Token Staking Compounder V3
 * Compound staking rewards with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface CompoundAction {
  compoundId: string;
  poolId: string;
  tokenAddress: string;
  rewardAmount: string;
  compoundedBy: string;
  timestamp: number;
}

export function useTokenStakingCompounderV3() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [compounds, setCompounds] = useState<CompoundAction[]>([]);

  const compoundRewards = async (
    poolId: string,
    tokenAddress: string,
    rewardAmount: string
  ): Promise<CompoundAction> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    
    const message = `Compound rewards: ${poolId} for ${tokenAddress} amount ${rewardAmount}`;
    await signMessageAsync({ message });
    
    const compound: CompoundAction = {
      compoundId: `compound-${Date.now()}`,
      poolId,
      tokenAddress,
      rewardAmount,
      compoundedBy: address,
      timestamp: Date.now(),
    };
    
    setCompounds([...compounds, compound]);
    return compound;
  };

  return { compoundRewards, compounds, address };
}
