'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentSentiment {
  contentHash: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  score: bigint;
  analyzer: string;
  timestamp: bigint;
}

export function useOnchainContentSentimentAnalyzer() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [analyzing, setAnalyzing] = useState(false);
  const [sentiments, setSentiments] = useState<ContentSentiment[]>([]);

  const { data: sentimentData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getSentiments',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const analyzeSentiment = async (contentHash: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setAnalyzing(true);

    try {
      const message = `Analyze sentiment onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'analyzeSentiment',
        args: [contentHash, address],
      });
    } finally {
      setAnalyzing(false);
    }
  };

  useEffect(() => {
    if (sentimentData) {
      const sentiment = sentimentData as ContentSentiment;
      setSentiments(prev => {
        const filtered = prev.filter(s => s.contentHash !== sentiment.contentHash);
        return [...filtered, sentiment];
      });
    }
  }, [sentimentData]);

  return {
    analyzeSentiment,
    analyzing,
    sentiments,
    address,
    isConnected,
    sentimentData,
  };
}

