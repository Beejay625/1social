'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState } from 'react';

export interface BurnTaxCalculation {
  amount: bigint;
  burnTax: bigint;
  burnPercentage: number;
  remainingAmount: bigint;
  totalBurned: bigint;
}

export function useTokenBurnTaxCalculatorV2() {
  const { address, isConnected } = useAccount();
  const [calculation, setCalculation] = useState<BurnTaxCalculation | null>(null);

  const { data: burnTaxRate } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'burnTaxRate',
  });

  const { data: totalBurned } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'totalBurned',
  });

  const calculateBurnTax = (amount: bigint): BurnTaxCalculation => {
    const taxRate = Number(burnTaxRate) || 0;
    const burnTax = (amount * BigInt(Math.floor(taxRate * 100))) / BigInt(10000);
    const remainingAmount = amount - burnTax;

    const calc: BurnTaxCalculation = {
      amount,
      burnTax,
      burnPercentage: taxRate,
      remainingAmount,
      totalBurned: (totalBurned as bigint) || BigInt(0),
    };

    setCalculation(calc);
    return calc;
  };

  return {
    calculateBurnTax,
    calculation,
    address,
    isConnected,
    burnTaxRate,
    totalBurned,
  };
}

