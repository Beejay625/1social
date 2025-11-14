'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SyndicationConfig {
  contentHash: string;
  targetProtocols: string[];
  syndicationFee: bigint;
  autoSyndicate: boolean;
}

export function useOnchainContentSyndicationManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [syndicating, setSyndicating] = useState(false);

  const { data: syndicationStatus } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getSyndicationStatus',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const syndicateContent = async (config: SyndicationConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setSyndicating(true);

    try {
      const message = `Syndicate content onchain to ${config.targetProtocols.length} protocols`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'syndicateContent',
        args: [config.contentHash, config.targetProtocols, config.syndicationFee],
      });
    } finally {
      setSyndicating(false);
    }
  };

  const enableAutoSyndication = async (contentHash: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setSyndicating(true);

    try {
      const message = `Enable auto-syndication onchain for content: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'enableAutoSyndication',
        args: [contentHash, address],
      });
    } finally {
      setSyndicating(false);
    }
  };

  return {
    syndicateContent,
    enableAutoSyndication,
    syndicating,
    address,
    isConnected,
    syndicationStatus,
  };
}

