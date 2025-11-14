'use client';

import { useAccount, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TrendData {
  keyword: string;
  trendScore: number;
  protocol: string;
  volume: bigint;
  growthRate: number;
}

export function useOnchainContentTrendAnalyzer() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [analyzing, setAnalyzing] = useState(false);
  const [trends, setTrends] = useState<TrendData[]>([]);

