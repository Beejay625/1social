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
  holderAddress: string;
  balance: string;
  reflectionRate: number;
  reflectionAmount: string;
  timestamp: number;
}

export function useTokenReflectionCalculator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [calculations, setCalculations] = useState<ReflectionCalculation[]>([]);

  const calculate = async (
    tokenAddress: string,
    holderAddress: string,
    balance: string,
    reflectionRate: number
  ): Promise<ReflectionCalculation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x') || !holderAddress.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    if (reflectionRate < 0) {
      throw new Error('Reflection rate cannot be negative');
    }
    
    const message = `Calculate reflection: ${tokenAddress} for ${holderAddress}`;
    await signMessageAsync({ message });
    
    const reflectionAmount = (parseFloat(balance) * reflectionRate / 100).toString();
    
    const calculation: ReflectionCalculation = {
      calculationId: `reflection-${Date.now()}`,
      tokenAddress,
      holderAddress,
      balance,
      reflectionRate,
      reflectionAmount,
      timestamp: Date.now(),
    };
    
    setCalculations([...calculations, calculation]);
    return calculation;
  };

  return { calculate, calculations, address };
}
