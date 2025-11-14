'use client';

/**
 * Token Liquidity Pool Price Impact Calculator
 * Calculate price impact for liquidity pool swaps with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface PriceImpactCalculation {
  calculationId: string;
  poolAddress: string;
  inputAmount: string;
  outputAmount: string;
  priceImpact: number;
  timestamp: number;
}

export function useTokenLiquidityPoolPriceImpactCalculator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [calculations, setCalculations] = useState<PriceImpactCalculation[]>([]);

  const calculate = async (
    poolAddress: string,
    inputAmount: string,
    outputAmount: string
  ): Promise<PriceImpactCalculation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!poolAddress.startsWith('0x')) {
      throw new Error('Invalid pool address format');
    }
    
    const message = `Calculate price impact: ${poolAddress} input ${inputAmount}`;
    await signMessageAsync({ message });
    
    const inputValue = parseFloat(inputAmount);
    const outputValue = parseFloat(outputAmount);
    const priceImpact = Math.abs((inputValue - outputValue) / inputValue) * 100;
    
    const calculation: PriceImpactCalculation = {
      calculationId: `impact-${Date.now()}`,
      poolAddress,
      inputAmount,
      outputAmount,
      priceImpact,
      timestamp: Date.now(),
    };
    
    setCalculations([...calculations, calculation]);
    return calculation;
  };

  return { calculate, calculations, address };
}

