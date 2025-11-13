'use client';

/**
 * Token Burn Tax Calculator
 * Calculate burn taxes for token transactions with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BurnTaxCalculation {
  calculationId: string;
  tokenAddress: string;
  amount: string;
  burnTaxRate: number;
  burnAmount: string;
  remainingAmount: string;
  timestamp: number;
}

export function useTokenBurnTaxCalculator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [calculations, setCalculations] = useState<BurnTaxCalculation[]>([]);

  const calculate = async (
    tokenAddress: string,
    amount: string,
    burnTaxRate: number
  ): Promise<BurnTaxCalculation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    if (burnTaxRate < 0 || burnTaxRate > 100) {
      throw new Error('Burn tax rate must be between 0 and 100');
    }
    
    const message = `Calculate burn tax: ${tokenAddress} ${amount} at ${burnTaxRate}%`;
    await signMessageAsync({ message });
    
    const burnAmount = (parseFloat(amount) * burnTaxRate / 100).toString();
    const remainingAmount = (parseFloat(amount) - parseFloat(burnAmount)).toString();
    
    const calculation: BurnTaxCalculation = {
      calculationId: `burn-tax-${Date.now()}`,
      tokenAddress,
      amount,
      burnTaxRate,
      burnAmount,
      remainingAmount,
      timestamp: Date.now(),
    };
    
    setCalculations([...calculations, calculation]);
    return calculation;
  };

  return { calculate, calculations, address };
}
