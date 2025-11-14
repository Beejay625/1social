'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BoostConfig {
  contentHash: string;
  boostAmount: bigint;
  duration: number;
  targetProtocols: string[];
}

export function useOnchainContentEngagementBooster() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [boosting, setBoosting] = useState(false);

  const { data: boostStatus } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getBoostStatus',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const boostEngagement = async (config: BoostConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setBoosting(true);

    try {
      const message = `Boost engagement onchain: ${config.boostAmount} for ${config.duration} days`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'boostEngagement',
        args: [config.contentHash, config.boostAmount, config.duration, config.targetProtocols],
      });
    } finally {
      setBoosting(false);
    }
  };

  return {
    boostEngagement,
    boosting,
    address,
    isConnected,
    boostStatus,
  };
}

