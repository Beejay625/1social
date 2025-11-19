'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RewardDistribution {
  poolAddress: string;
  recipients: string[];
  amounts: bigint[];
}

export function useTokenStakingPoolRewardDistributorV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [distributing, setDistributing] = useState(false);

  const distributeRewards = async (distribution: RewardDistribution) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setDistributing(true);

    try {
      const message = `Distribute rewards to ${distribution.recipients.length} recipients`;
      await signMessageAsync({ message });

      await writeContract({
        address: distribution.poolAddress as `0x${string}`,
        abi: [],
        functionName: 'distributeRewards',
        args: [distribution.recipients, distribution.amounts],
      });
    } finally {
      setDistributing(false);
    }
  };

  return {
    distributeRewards,
    distributing,
    address,
    isConnected,
  };
}

