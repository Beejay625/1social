'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState } from 'react';

export interface ILCalculation {
  initialPrice: bigint;
  currentPrice: bigint;
  initialLiquidity: bigint;
  currentLiquidity: bigint;
  impermanentLoss: bigint;
  lossPercentage: number;
}

export function useTokenLiquidityPoolImpermanentLossCalculator() {
  const { address, isConnected } = useAccount();
  const [calculation, setCalculation] = useState<ILCalculation | null>(null);

  const calculateIL = (initialPrice: bigint, currentPrice: bigint, initialLiquidity: bigint): ILCalculation => {
    if (!address || !isConnected) throw new Error('Wallet not connected');

    // Impermanent Loss formula: 2 * sqrt(price_ratio) / (1 + price_ratio) - 1
    const priceRatio = Number(currentPrice) / Number(initialPrice);
    const sqrtPriceRatio = Math.sqrt(priceRatio);
    const ilRatio = (2 * sqrtPriceRatio) / (1 + priceRatio) - 1;
    const ilPercentage = Math.abs(ilRatio * 100);
    
    const impermanentLoss = (initialLiquidity * BigInt(Math.floor(ilPercentage * 100))) / BigInt(10000);
    const currentLiquidity = initialLiquidity - impermanentLoss;

    const calc: ILCalculation = {
      initialPrice,
      currentPrice,
      initialLiquidity,
      currentLiquidity,
      impermanentLoss,
      lossPercentage: ilPercentage,
    };

    setCalculation(calc);
    return calc;
  };

  return {
    calculateIL,
    calculation,
    address,
    isConnected,
  };
}
