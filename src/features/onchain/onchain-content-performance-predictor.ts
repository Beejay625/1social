'use client';

import { useAccount, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface PerformancePrediction {
  contentHash: string;
  predictedViews: bigint;
  predictedEngagement: bigint;
  confidence: number;
  factors: string[];
}

export function useOnchainContentPerformancePredictor() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [predicting, setPredicting] = useState(false);
  const [predictions, setPredictions] = useState<PerformancePrediction[]>([]);

