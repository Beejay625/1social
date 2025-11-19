'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentTrend {
  trendId: string;
  keyword: string;
  score: bigint;
  timestamp: bigint;
}

export function useOnchainContentTrendDetector() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [detecting, setDetecting] = useState(false);
  const [trends, setTrends] = useState<ContentTrend[]>([]);

  const { data: trendData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getTrends',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const detectTrends = async (timeframe: bigint) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setDetecting(true);

    try {
      const message = `Detect trends onchain: ${timeframe}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'detectTrends',
        args: [timeframe, address],
      });
    } finally {
      setDetecting(false);
    }
  };

  useEffect(() => {
    if (trendData) {
      const trend = trendData as ContentTrend;
      setTrends(prev => {
        const filtered = prev.filter(t => t.trendId !== trend.trendId);
        return [...filtered, trend];
      });
    }
  }, [trendData]);

  return {
    detectTrends,
    detecting,
    trends,
    address,
    isConnected,
    trendData,
  };
}

