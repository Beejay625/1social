'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface GasOptimization {
  contract: string;
  savings: bigint;
  suggestions: string[];
  wallet: string;
  timestamp: number;
}

export function useContractGasOptimizer() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [optimizations, setOptimizations] = useState<GasOptimization[]>([]);

  const optimizeGas = async (contract: string, savings: bigint, suggestions: string[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Optimize Gas: ${contract}`;
    await signMessageAsync({ message });
    
    const optimization: GasOptimization = {
      contract,
      savings,
      suggestions,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setOptimizations([...optimizations, optimization]);
    return optimization;
  };

  return { optimizeGas, optimizations, address };
}

