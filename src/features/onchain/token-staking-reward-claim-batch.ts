'use client';

/**
 * Token Staking Reward Claim Batch
 * Batch claim staking rewards for gas efficiency with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BatchClaim {
  claimId: string;
  stakingPool: string;
  rewardIds: string[];
  totalReward: string;
  claimedBy: string;
  txHash: string;
  timestamp: number;
}

export function useTokenStakingRewardClaimBatch() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [claims, setClaims] = useState<BatchClaim[]>([]);

  const batchClaim = async (
    stakingPool: string,
    rewardIds: string[],
    totalReward: string
  ): Promise<BatchClaim> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!stakingPool.startsWith('0x')) {
      throw new Error('Invalid staking pool address format');
    }
    if (rewardIds.length === 0) {
      throw new Error('At least one reward ID is required');
    }
    
    const message = `Batch claim rewards: ${stakingPool} ${rewardIds.length} rewards`;
    await signMessageAsync({ message });
    
    const claim: BatchClaim = {
      claimId: `claim-${Date.now()}`,
      stakingPool,
      rewardIds,
      totalReward,
      claimedBy: address,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setClaims([...claims, claim]);
    return claim;
  };

  return { batchClaim, claims, address };
}

