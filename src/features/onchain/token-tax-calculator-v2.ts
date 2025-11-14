'use client';

/**
 * Token Tax Calculator V2
 * Calculate taxes for token transactions with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TaxCalculation {
  calculationId: string;
  tokenAddress: string;
  amount: string;
  taxPercentage: number;
  taxAmount: string;
  netAmount: string;
  timestamp: number;
}

export function useTokenTaxCalculatorV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [calculations, setCalculations] = useState<TaxCalculation[]>([]);

  const calculate = async (
    tokenAddress: string,
    amount: string,
    taxPercentage: number
  ): Promise<TaxCalculation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    if (taxPercentage < 0 || taxPercentage > 100) {
      throw new Error('Tax percentage must be between 0 and 100');
    }
    
    const message = `Calculate tax: ${tokenAddress} ${amount} ${taxPercentage}%`;
    await signMessageAsync({ message });
    
    const taxAmount = (BigInt(amount) * BigInt(Math.floor(taxPercentage * 100))) / BigInt(10000);
    const netAmount = BigInt(amount) - taxAmount;
    
    const calculation: TaxCalculation = {
      calculationId: `tax-${Date.now()}`,
      tokenAddress,
      amount,
      taxPercentage,
      taxAmount: taxAmount.toString(),
      netAmount: netAmount.toString(),
      timestamp: Date.now(),
    };
    
    setCalculations([...calculations, calculation]);
    return calculation;
  };

  return { calculate, calculations, address };
}

