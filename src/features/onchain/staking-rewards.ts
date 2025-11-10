'use client';

import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface StakingReward {
  amount: bigint;
  period: number;
  apy: number;
  claimed: boolean;
}

export function useStakingRewards() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const [rewards, setRewards] = useState<StakingReward[]>([]);

  const { data: rewardData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getRewards',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  useEffect(() => {
    if (address && rewardData) {
      const reward: StakingReward = {
        amount: (rewardData as any)?.amount || BigInt(0),
        period: 30,
        apy: 12.5,
        claimed: false,
      };
      setRewards([reward]);
    }
  }, [address, rewardData]);

  const claimRewards = async () => {
    if (!isConnected || !address) {
      throw new Error('Reown wallet not connected');
    }

    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'claimRewards',
      args: [],
    });

    return txHash;
  };

  return { rewards, claimRewards, isConnected, address };
}
