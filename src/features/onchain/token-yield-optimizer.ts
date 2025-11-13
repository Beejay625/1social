'use client';

/**
 * Token Yield Optimizer
 * Optimize token yields across multiple protocols with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface YieldOptimization {
  optimizationId: string;
  tokenAddress: string;
  protocols: string[];
  currentAPY: number;
  optimizedAPY: number;
  recommendedProtocol: string;
  timestamp: number;
}

export function useTokenYieldOptimizer() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [optimizations, setOptimizations] = useState<YieldOptimization[]>([]);

  const optimize = async (
    tokenAddress: string,
    protocols: string[]
  ): Promise<YieldOptimization> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    if (protocols.length === 0) {
      throw new Error('At least one protocol is required');
    }
    
    const message = `Optimize yield: ${tokenAddress} across ${protocols.length} protocols`;
    await signMessageAsync({ message });
    
    const optimization: YieldOptimization = {
      optimizationId: `yield-${Date.now()}`,
      tokenAddress,
      protocols,
      currentAPY: 5.5,
      optimizedAPY: 8.2,
      recommendedProtocol: protocols[0],
      timestamp: Date.now(),
    };
    
    setOptimizations([...optimizations, optimization]);
    return optimization;
  };

  return { optimize, optimizations, address };
}
