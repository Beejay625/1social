'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SubscriptionConfig {
  contentHash: string;
  subscriptionPrice: bigint;
  duration: number;
  autoRenew: boolean;
}

export function useOnchainContentSubscriptionManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);

  const { data: subscriptionData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getSubscription',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const createSubscription = async (config: SubscriptionConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Create subscription onchain: ${config.subscriptionPrice} for ${config.duration} days`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'createSubscription',
        args: [config.contentHash, config.subscriptionPrice, config.duration, config.autoRenew],
      });
    } finally {
      setManaging(false);
    }
  };

  const subscribe = async (contentHash: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Subscribe to content onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'subscribe',
        args: [contentHash, address],
      });
    } finally {
      setManaging(false);
    }
  };

  return {
    createSubscription,
    subscribe,
    managing,
    address,
    isConnected,
    subscriptionData,
  };
}

