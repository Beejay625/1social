'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentRecommendation {
  contentHash: string;
  score: bigint;
  reason: string;
  timestamp: bigint;
}

export function useOnchainContentRecommendationEngine() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [processing, setProcessing] = useState(false);
  const [recommendations, setRecommendations] = useState<ContentRecommendation[]>([]);

  const { data: recommendationData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getRecommendations',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const generateRecommendations = async (userAddress: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      const message = `Generate recommendations onchain: ${userAddress}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'generateRecommendations',
        args: [userAddress, address],
      });
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (recommendationData) {
      const recommendation = recommendationData as ContentRecommendation;
      setRecommendations(prev => {
        const filtered = prev.filter(r => r.contentHash !== recommendation.contentHash);
        return [...filtered, recommendation];
      });
    }
  }, [recommendationData]);

  return {
    generateRecommendations,
    processing,
    recommendations,
    address,
    isConnected,
    recommendationData,
  };
}

