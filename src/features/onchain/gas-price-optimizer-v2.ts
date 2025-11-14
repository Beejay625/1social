'use client';

import { useAccount, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface GasOptimization {
  currentPrice: bigint;
  recommendedPrice: bigint;
  estimatedTime: number;
  savings: bigint;
}

export function useGasPriceOptimizerV2() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [optimization, setOptimization] = useState<GasOptimization | null>(null);

  const { data: currentGasPrice } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getGasPrice',
    query: { enabled: isConnected },
  });

  const optimize = async () => {
    if (!address || !isConnected) throw new Error('Wallet not connected');

    const message = `Optimize gas price for transaction`;
    await signMessageAsync({ message });

    const current = currentGasPrice as bigint || 20000000000n;
    const recommended = current * 9n / 10n;

    const opt: GasOptimization = {
      currentPrice: current,
      recommendedPrice: recommended,
      estimatedTime: 30,
      savings: current - recommended,
    };

    setOptimization(opt);
    return opt;
  };

  return {
    optimize,
    optimization,
    address,
    isConnected,
    currentGasPrice,
  };
}

