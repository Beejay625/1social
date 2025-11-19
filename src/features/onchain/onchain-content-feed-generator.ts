'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentFeed {
  feedId: string;
  contentHashes: string[];
  algorithm: string;
  timestamp: bigint;
}

export function useOnchainContentFeedGenerator() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [generating, setGenerating] = useState(false);
  const [feeds, setFeeds] = useState<ContentFeed[]>([]);

  const { data: feedData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getFeeds',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const generateFeed = async (algorithm: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setGenerating(true);

    try {
      const message = `Generate feed onchain: ${algorithm}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'generateFeed',
        args: [algorithm, address],
      });
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    if (feedData) {
      const feed = feedData as ContentFeed;
      setFeeds(prev => {
        const filtered = prev.filter(f => f.feedId !== feed.feedId);
        return [...filtered, feed];
      });
    }
  }, [feedData]);

  return {
    generateFeed,
    generating,
    feeds,
    address,
    isConnected,
    feedData,
  };
}

