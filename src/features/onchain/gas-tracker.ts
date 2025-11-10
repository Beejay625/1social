'use client';

import { useAccount, useFeeData } from 'wagmi';
import { useState, useEffect } from 'react';

export interface GasInfo {
  gasPrice: bigint | null;
  maxFee: bigint | null;
  maxPriorityFee: bigint | null;
  timestamp: number;
}

export function useGasTracker() {
  const { address, chainId } = useAccount();
  const { data: feeData } = useFeeData({ chainId });
  const [gasInfo, setGasInfo] = useState<GasInfo | null>(null);

  useEffect(() => {
    if (feeData) {
      setGasInfo({
        gasPrice: feeData.gasPrice || null,
        maxFee: feeData.maxFeePerGas || null,
        maxPriorityFee: feeData.maxPriorityFeePerGas || null,
        timestamp: Date.now(),
      });
    }
  }, [feeData]);

  return { gasInfo, address, chainId };
}
