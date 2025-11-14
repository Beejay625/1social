'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RewardDistribution {
  recipients: string[];
  amounts: bigint[];
}

export function useTokenRewardDistributorV4() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [distributing, setDistributing] = useState(false);

  const distribute = async (tokenAddress: string, distribution: RewardDistribution) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setDistributing(true);

    try {
      const message = `Distribute rewards to ${distribution.recipients.length} recipients`;
      await signMessageAsync({ message });

      await writeContract({
        address: tokenAddress as `0x${string}`,
        abi: [],
        functionName: 'distributeRewards',
        args: [distribution.recipients, distribution.amounts],
      });
    } finally {
      setDistributing(false);
    }
  };

  return {
    distribute,
    distributing,
    address,
    isConnected,
  };
}

