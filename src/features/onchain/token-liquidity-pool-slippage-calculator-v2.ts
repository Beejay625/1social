'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState } from 'react';

export interface SlippageCalculation {
  amountIn: bigint;
  expectedOut: bigint;
  minAmountOut: bigint;
  slippagePercent: number;
  priceImpact: number;
}

export function useTokenLiquidityPoolSlippageCalculatorV2() {
  const { address, isConnected } = useAccount();
  const [calculation, setCalculation] = useState<SlippageCalculation | null>(null);

  const calculateSlippage = (amountIn: bigint, expectedOut: bigint, tolerancePercent: number): SlippageCalculation => {
    if (!address || !isConnected) throw new Error('Wallet not connected');

    const minAmount = (expectedOut * BigInt(Math.floor((100 - tolerancePercent) * 100))) / BigInt(10000);
    const priceImpact = 0.5; // Placeholder

    const calc: SlippageCalculation = {
      amountIn,
      expectedOut,
      minAmountOut: minAmount,
      slippagePercent: tolerancePercent,
      priceImpact,
    };

    setCalculation(calc);
    return calc;
  };

  return {
    calculateSlippage,
    calculation,
    address,
    isConnected,
  };
}

