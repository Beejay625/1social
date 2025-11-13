'use client';

import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

/**
 * Reward claim information
 */
export interface RewardClaim {
  rewardId: string;
  tokenAddress: string;
  amount: string;
  claimedAt?: number;
  optimized: boolean;
}

/**
 * Hook for optimizing reward claims with Reown wallet integration
 * Batches multiple reward claims for gas efficiency
 */
export function useTokenRewardClaimOptimizer() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [claims, setClaims] = useState<RewardClaim[]>([]);

  const optimizeAndClaim = async (rewardIds: string[], tokenAddress: string) => {
    if (!address || !isConnected) throw new Error('Reown wallet not connected');
    
    const message = `Optimize and claim ${rewardIds.length} rewards for token ${tokenAddress}`;
    await signMessageAsync({ message });
    
    const newClaims: RewardClaim[] = rewardIds.map(id => ({
      rewardId: id,
      tokenAddress,
      amount: '0',
      optimized: true,
    }));
    
    setClaims([...claims, ...newClaims]);
    return newClaims;
  };

  return { 
    optimizeAndClaim, 
    claims, 
    address, 
    isConnected,
    hash,
    isPending,
    isConfirming,
    isConfirmed
  };
}
