'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RoyaltyConfig {
  contentHash: string;
  royaltyPercentage: number;
  recipients: string[];
  splitPercentages: number[];
}

export function useOnchainContentRoyaltyManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);

  const { data: royaltyInfo } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getRoyaltyInfo',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const setRoyalty = async (config: RoyaltyConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Set onchain royalty: ${config.royaltyPercentage}% for content ${config.contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'setContentRoyalty',
        args: [
          config.contentHash,
          config.royaltyPercentage,
          config.recipients,
          config.splitPercentages,
        ],
      });
    } finally {
      setManaging(false);
    }
  };

  const collectRoyalties = async (contentHash: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Collect onchain royalties for content: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'collectRoyalties',
        args: [contentHash, address],
      });
    } finally {
      setManaging(false);
    }
  };

  return {
    setRoyalty,
    collectRoyalties,
    managing,
    address,
    isConnected,
    royaltyInfo,
  };
}

