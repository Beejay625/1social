'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RewardDistribution {
  tokenAddress: string;
  recipients: string[];
  amounts: bigint[];
  distributionType: 'equal' | 'weighted' | 'custom';
}

export function useTokenRewardDistributorV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [distributing, setDistributing] = useState(false);
  const [progress, setProgress] = useState(0);

  const { data: totalRewards } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'totalDistributed',
    args: [address],
  });

  const distributeRewards = async (distribution: RewardDistribution) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setDistributing(true);
    setProgress(0);

    try {
      const message = `Distribute rewards to ${distribution.recipients.length} recipients`;
      await signMessageAsync({ message });

      // Batch distribution for gas efficiency
      const batchSize = 50;
      const batches = Math.ceil(distribution.recipients.length / batchSize);

      for (let i = 0; i < batches; i++) {
        const start = i * batchSize;
        const end = Math.min(start + batchSize, distribution.recipients.length);
        const batchRecipients = distribution.recipients.slice(start, end);
        const batchAmounts = distribution.amounts.slice(start, end);

        await writeContract({
          address: distribution.tokenAddress as `0x${string}`,
          abi: [],
          functionName: 'distribute',
          args: [batchRecipients, batchAmounts],
        });

        setProgress(Math.round(((i + 1) / batches) * 100));
      }
    } finally {
      setDistributing(false);
    }
  };

  return {
    distributeRewards,
    distributing,
    progress,
    address,
    isConnected,
    totalRewards,
  };
}

