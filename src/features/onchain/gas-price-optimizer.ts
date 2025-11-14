'use client';

/**
 * Gas Price Optimizer
 * Optimize gas prices for transactions with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface GasOptimization {
  optimizationId: string;
  transactionType: string;
  currentGasPrice: string;
  optimizedGasPrice: string;
  savings: string;
  optimizedBy: string;
  timestamp: number;
}

export function useGasPriceOptimizer() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [optimizations, setOptimizations] = useState<GasOptimization[]>([]);

  const optimizeGasPrice = async (
    transactionType: string,
    currentGasPrice: string
  ): Promise<GasOptimization> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Optimize gas price: ${transactionType} current ${currentGasPrice}`;
    await signMessageAsync({ message });
    
    const optimizedGasPrice = (parseFloat(currentGasPrice) * 0.9).toFixed(0);
    const savings = (parseFloat(currentGasPrice) - parseFloat(optimizedGasPrice)).toFixed(0);
    
    const optimization: GasOptimization = {
      optimizationId: `gas-optimize-${Date.now()}`,
      transactionType,
      currentGasPrice,
      optimizedGasPrice,
      savings,
      optimizedBy: address,
      timestamp: Date.now(),
    };
    
    setOptimizations([...optimizations, optimization]);
    return optimization;
  };

  return { optimizeGasPrice, optimizations, address };
}
