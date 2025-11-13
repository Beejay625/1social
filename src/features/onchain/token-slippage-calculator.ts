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
  slippage: number;
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
    slippageTolerance: number
  ): Promise<SlippageCalculation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenIn.startsWith('0x') || !tokenOut.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    if (slippageTolerance < 0 || slippageTolerance > 100) {
      throw new Error('Slippage tolerance must be between 0 and 100');
    }
    
    const message = `Calculate slippage: ${tokenIn} -> ${tokenOut}`;
    await signMessageAsync({ message });
    
    const expectedAmountOut = (parseFloat(amountIn) * 0.95).toString();
    const minAmountOut = (parseFloat(expectedAmountOut) * (1 - slippageTolerance / 100)).toString();
    
    const calculation: SlippageCalculation = {
      calculationId: `calc-${Date.now()}`,
      tokenIn,
      tokenOut,
      amountIn,
      expectedAmountOut,
      minAmountOut,
      slippage: slippageTolerance,
      timestamp: Date.now(),
    };
    
    setCalculations([...calculations, calculation]);
    return calculation;
  };

  return { calculate, calculations, address };
}
