'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface RewardClaim {
  claimer: string;
  amount: bigint;
  token: string;
  claimedAt: number;
}

export function useRewardClaimTracker() {
  const { address } = useAccount();
  const { data: rewards } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'pendingRewards',
    args: [address],
  });
  const [claims, setClaims] = useState<RewardClaim[]>([]);

  useEffect(() => {
    if (!address || !rewards) return;
    
    const claim: RewardClaim = {
      claimer: address,
      amount: BigInt(rewards as string),
      token: 'ETH',
      claimedAt: Date.now(),
    };
    
    setClaims([claim]);
  }, [address, rewards]);

  return { claims, address };
}
