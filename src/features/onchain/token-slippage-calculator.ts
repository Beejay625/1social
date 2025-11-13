'use client';

/**
 * Token Slippage Calculator
 * Calculate slippage for token swaps with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SlippageCalculation {
  calculationId: string;
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  expectedAmountOut: string;
  minAmountOut: string;
  slippagePercentage: number;
  timestamp: number;
}

export function useTokenSlippageCalculator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [calculations, setCalculations] = useState<SlippageCalculation[]>([]);

  const calculate = async (
    tokenIn: string,
    tokenOut: string,
    amountIn: string,
    slippagePercentage: number
  ): Promise<SlippageCalculation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (slippagePercentage < 0 || slippagePercentage > 100) {
      throw new Error('Slippage percentage must be between 0 and 100');
    }
    
    const message = `Calculate slippage: ${tokenIn} -> ${tokenOut}`;
    await signMessageAsync({ message });
    
    const expectedAmountOut = (parseFloat(amountIn) * 0.95).toString();
    const minAmountOut = (parseFloat(expectedAmountOut) * (1 - slippagePercentage / 100)).toString();
    
    const calculation: SlippageCalculation = {
      calculationId: `calc-${Date.now()}`,
      tokenIn,
      tokenOut,
      amountIn,
      expectedAmountOut,
      minAmountOut,
      slippagePercentage,
      timestamp: Date.now(),
    };
    
    setCalculations([...calculations, calculation]);
    return calculation;
  };

  return { calculate, calculations, address };
}

