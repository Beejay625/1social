'use client';

import { useAccount, useFeeData } from 'wagmi';
import { useState, useEffect } from 'react';

export interface GasPrediction {
  current: bigint;
  predicted: bigint;
  trend: 'up' | 'down' | 'stable';
  timestamp: number;
}

export function useGasPricePredictor() {
  const { address, chainId } = useAccount();
  const { data: feeData } = useFeeData({ chainId });
  const [prediction, setPrediction] = useState<GasPrediction | null>(null);

  useEffect(() => {
    if (feeData?.gasPrice) {
      const pred: GasPrediction = {
        current: feeData.gasPrice,
        predicted: feeData.gasPrice * BigInt(110) / BigInt(100),
        trend: 'up',
        timestamp: Date.now(),
      };
      setPrediction(pred);
    }
  }, [feeData]);

  return { prediction, address, chainId };
}


