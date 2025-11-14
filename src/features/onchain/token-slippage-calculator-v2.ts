'use client';

/**
 * Token Slippage Calculator V2
 * Calculate slippage for token swaps with enhanced features via Reown wallet
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

export function useTokenSlippageCalculatorV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [calculations, setCalculations] = useState<SlippageCalculation[]>([]);

  const calculate = async (
    tokenIn: string,
    tokenOut: string,
    amountIn: string,
    expectedAmountOut: string,
    slippagePercentage: number
  ): Promise<SlippageCalculation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (slippagePercentage < 0 || slippagePercentage > 100) {
      throw new Error('Slippage percentage must be between 0 and 100');
    }
    
    const message = `Calculate slippage: ${tokenIn} -> ${tokenOut} ${slippagePercentage}%`;
    await signMessageAsync({ message });
    
    const minAmountOut = (BigInt(expectedAmountOut) * BigInt(Math.floor((100 - slippagePercentage) * 100))) / BigInt(10000);
    
    const calculation: SlippageCalculation = {
      calculationId: `slippage-${Date.now()}`,
      tokenIn,
      tokenOut,
      amountIn,
      expectedAmountOut,
      minAmountOut: minAmountOut.toString(),
      slippagePercentage,
      timestamp: Date.now(),
    };
    
    setCalculations([...calculations, calculation]);
    return calculation;
  };

  return { calculate, calculations, address };
}

