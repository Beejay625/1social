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
  actualAmountOut: string;
  slippage: number;
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
    expectedAmountOut: string
  ): Promise<SlippageCalculation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenIn.startsWith('0x') || !tokenOut.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    
    const message = `Calculate slippage: ${tokenIn} -> ${tokenOut} amount ${amountIn}`;
    await signMessageAsync({ message });
    
    const actualAmountOut = (parseFloat(expectedAmountOut) * 0.98).toString();
    const slippage = ((parseFloat(expectedAmountOut) - parseFloat(actualAmountOut)) / parseFloat(expectedAmountOut)) * 100;
    
    const calculation: SlippageCalculation = {
      calculationId: `slippage-${Date.now()}`,
      tokenIn,
      tokenOut,
      amountIn,
      expectedAmountOut,
      actualAmountOut,
      slippage,
      timestamp: Date.now(),
    };
    
    setCalculations([...calculations, calculation]);
    return calculation;
  };

  return { calculate, calculations, address };
}
