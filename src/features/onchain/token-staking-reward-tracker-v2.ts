'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface RewardData {
  totalEarned: bigint;
  pendingRewards: bigint;
  claimedRewards: bigint;
  lastClaimTime: number;
  nextClaimTime: number;
  apy: number;
}

export function useTokenStakingRewardTrackerV2() {
  const { address, isConnected } = useAccount();
  const [rewards, setRewards] = useState<RewardData | null>(null);
  const [loading, setLoading] = useState(false);

  const { data: pendingRewards } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'pendingRewards',
    args: [address],
  });

  const { data: totalEarned } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'totalEarned',
    args: [address],
  });

  useEffect(() => {
    if (address && isConnected) {
      fetchRewards();
    }
  }, [address, isConnected, pendingRewards, totalEarned]);

  const fetchRewards = async () => {
    if (!address) return;
    setLoading(true);

    try {
      const data: RewardData = {
        totalEarned: (totalEarned as bigint) || BigInt(0),
        pendingRewards: (pendingRewards as bigint) || BigInt(0),
        claimedRewards: BigInt(0),
        lastClaimTime: 0,
        nextClaimTime: 0,
        apy: 0,
      };

      setRewards(data);
    } finally {
      setLoading(false);
    }
  };

  return {
    rewards,
    loading,
    address,
    isConnected,
    refresh: fetchRewards,
  };
}

