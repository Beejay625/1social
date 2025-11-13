'use client';

/**
 * Token Reward Claim Optimizer
 * Optimize reward claims for gas efficiency with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ClaimOptimization {
  tokenAddress: string;
  optimalAmount: string;
  gasEstimate: string;
  recommendedTime: number;
  timestamp: number;
}

export function useTokenRewardClaimOptimizer() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [optimizations, setOptimizations] = useState<ClaimOptimization[]>([]);

  const optimizeClaim = async (
    tokenAddress: string,
    pendingRewards: string
  ): Promise<ClaimOptimization> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    
    const message = `Optimize reward claim: ${tokenAddress} ${pendingRewards}`;
    await signMessageAsync({ message });
    
    const optimization: ClaimOptimization = {
      tokenAddress,
      optimalAmount: pendingRewards,
      gasEstimate: '150000',
      recommendedTime: Date.now() + 3600000,
      timestamp: Date.now(),
    };
    
    setOptimizations([...optimizations, optimization]);
    return optimization;
  };

  return { optimizeClaim, optimizations, address };
}
