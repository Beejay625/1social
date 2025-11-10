'use client';

import { useAccount, useFeeData } from 'wagmi';
import { useState, useEffect } from 'react';

export interface SpeedOptimization {
  currentSpeed: string;
  recommendedSpeed: string;
  gasPrice: bigint;
  estimatedTime: number;
}

export function useTransactionSpeedOptimizer() {
  const { address, chainId } = useAccount();
  const { data: feeData } = useFeeData({ chainId });
  const [optimization, setOptimization] = useState<SpeedOptimization | null>(null);

  useEffect(() => {
    if (feeData?.gasPrice) {
      const opt: SpeedOptimization = {
        currentSpeed: 'standard',
        recommendedSpeed: 'fast',
        gasPrice: feeData.gasPrice,
        estimatedTime: 15,
      };
      setOptimization(opt);
    }
  }, [feeData]);

  return { optimization, address, chainId };
}

