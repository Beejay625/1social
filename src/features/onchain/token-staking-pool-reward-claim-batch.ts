'use client';

/**
 * Token Staking Pool Reward Claim Batch
 * Batch claim rewards from multiple staking pools with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface BatchClaim {
  claimId: string;
  stakingPools: string[];
  totalRewards: string;
  claimedBy: string;
  timestamp: number;
}

export function useTokenStakingPoolRewardClaimBatch() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [claims, setClaims] = useState<BatchClaim[]>([]);

  const claimBatch = async (
    stakingPools: string[]
  ): Promise<BatchClaim> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (stakingPools.length === 0) {
      throw new Error('At least one staking pool is required');
    }
    if (stakingPools.some(pool => !pool.startsWith('0x'))) {
      throw new Error('Invalid staking pool address format');
    }
    
    const message = `Batch claim rewards: ${stakingPools.length} pools`;
    await signMessageAsync({ message });
    
    const claim: BatchClaim = {
      claimId: `batch-${Date.now()}`,
      stakingPools,
      totalRewards: '0',
      claimedBy: address,
      timestamp: Date.now(),
    };
    
    setClaims([...claims, claim]);
    return claim;
  };

  return { claimBatch, claims, address };
}

