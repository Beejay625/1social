'use client';

/**
 * Token Reflection Calculator V2
 * Calculate reflection rewards with enhanced features via Reown wallet
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

export function useTokenReflectionCalculatorV2() {
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
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    if (reflectionPercentage < 0 || reflectionPercentage > 100) {
      throw new Error('Reflection percentage must be between 0 and 100');
    }
    
    const message = `Calculate reflection: ${tokenAddress} ${reflectionPercentage}%`;
    await signMessageAsync({ message });
    
    const reflectionAmount = (BigInt(holderBalance) * BigInt(Math.floor(reflectionPercentage * 100))) / BigInt(10000);
    
    const calculation: ReflectionCalculation = {
      calculationId: `reflect-${Date.now()}`,
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

