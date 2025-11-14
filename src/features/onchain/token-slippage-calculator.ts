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
  expectedOut: string;
  slippage: number;
  calculatedBy: string;
  timestamp: number;
}

export function useTokenSlippageCalculator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [calculations, setCalculations] = useState<SlippageCalculation[]>([]);

  const calculateSlippage = async (
    tokenIn: string,
    tokenOut: string,
    amountIn: string,
    expectedOut: string
  ): Promise<SlippageCalculation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenIn.startsWith('0x') || !tokenOut.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    
    const message = `Calculate slippage: ${tokenIn} to ${tokenOut} amount ${amountIn}`;
    await signMessageAsync({ message });
    
    const actualOut = parseFloat(expectedOut) * (1 - Math.random() * 0.05);
    const slippage = ((parseFloat(expectedOut) - actualOut) / parseFloat(expectedOut)) * 100;
    
    const calculation: SlippageCalculation = {
      calculationId: `slippage-${Date.now()}`,
      tokenIn,
      tokenOut,
      amountIn,
      expectedOut,
      slippage,
      calculatedBy: address,
      timestamp: Date.now(),
    };
    
    setCalculations([...calculations, calculation]);
    return calculation;
  };

  return { calculateSlippage, calculations, address };
}
