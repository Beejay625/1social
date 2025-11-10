'use client';

import { useAccount, useFeeData } from 'wagmi';
import { useState, useEffect } from 'react';

export interface GasPriceData {
  gasPrice: bigint | null;
  maxFeePerGas: bigint | null;
  maxPriorityFeePerGas: bigint | null;
  timestamp: number;
}

export function useGasPriceMonitor() {
  const { address, isConnected, chainId } = useAccount();
  const { data: feeData } = useFeeData({ chainId });
  const [gasData, setGasData] = useState<GasPriceData | null>(null);

  useEffect(() => {
    if (feeData) {
      setGasData({
        gasPrice: feeData.gasPrice || null,
        maxFeePerGas: feeData.maxFeePerGas || null,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas || null,
        timestamp: Date.now(),
      });
    }
  }, [feeData]);

  const getOptimalGasPrice = () => {
    if (!gasData) return null;
    return gasData.maxFeePerGas || gasData.gasPrice;
  };

  return { gasData, getOptimalGasPrice, isConnected, address, chainId };
}

