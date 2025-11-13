'use client';

/**
 * Token Reflection Calculator
 * Calculate reflection rewards with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ReflectionCalculation {
  calculationId: string;
  tokenAddress: string;
  holderBalance: string;
  totalSupply: string;
  reflectionPercentage: number;
  reflectionAmount: string;
  timestamp: number;
}

export function useTokenReflectionCalculator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [calculations, setCalculations] = useState<ReflectionCalculation[]>([]);

  const calculate = async (
    tokenAddress: string,
    holderBalance: string,
    totalSupply: string,
    reflectionPercentage: number
  ): Promise<ReflectionCalculation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (reflectionPercentage < 0 || reflectionPercentage > 100) {
      throw new Error('Reflection percentage must be between 0 and 100');
    }
    
    const message = `Calculate reflection: ${tokenAddress}`;
    await signMessageAsync({ message });
    
    const holderShare = (BigInt(holderBalance) * BigInt(10000)) / BigInt(totalSupply);
    const reflectionAmount = (BigInt(totalSupply) * BigInt(Math.floor(reflectionPercentage * 100)) * holderShare) / BigInt(100000000);
    
    const calculation: ReflectionCalculation = {
      calculationId: `calc-${Date.now()}`,
      tokenAddress,
      holderBalance,
      totalSupply,
      reflectionPercentage,
      reflectionAmount: reflectionAmount.toString(),
      timestamp: Date.now(),
    };
    
    setCalculations([...calculations, calculation]);
    return calculation;
  };

  return { calculate, calculations, address };
}

