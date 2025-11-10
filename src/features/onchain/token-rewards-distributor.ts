'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface RewardDistribution {
  recipients: string[];
  amounts: bigint[];
  tokenAddress: string;
}

export function useTokenRewardsDistributor() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const [distributions, setDistributions] = useState<RewardDistribution[]>([]);

  const distributeRewards = async (distribution: RewardDistribution) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    const txHash = await writeContract({
      address: distribution.tokenAddress as `0x${string}`,
      abi: [],
      functionName: 'batchTransfer',
      args: [distribution.recipients, distribution.amounts],
    });

    setDistributions([...distributions, distribution]);
    return txHash;
  };

  return { distributeRewards, distributions, isConnected, address };
}

