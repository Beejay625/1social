'use client';

/**
 * Token Tax Calculator
 * Calculate taxes for token transactions with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TaxCalculation {
  calculationId: string;
  tokenAddress: string;
  transactionType: 'buy' | 'sell' | 'transfer';
  amount: string;
  taxRate: number;
  taxAmount: string;
  netAmount: string;
  timestamp: number;
}

export function useTokenTaxCalculator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [calculations, setCalculations] = useState<TaxCalculation[]>([]);

  const calculate = async (
    tokenAddress: string,
    transactionType: 'buy' | 'sell' | 'transfer',
    amount: string,
    taxRate: number
  ): Promise<TaxCalculation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    if (taxRate < 0 || taxRate > 100) {
      throw new Error('Tax rate must be between 0 and 100');
    }
    
    const message = `Calculate tax: ${tokenAddress} ${transactionType} ${amount}`;
    await signMessageAsync({ message });
    
    const taxAmount = (parseFloat(amount) * taxRate / 100).toString();
    const netAmount = (parseFloat(amount) - parseFloat(taxAmount)).toString();
    
    const calculation: TaxCalculation = {
      calculationId: `tax-${Date.now()}`,
      tokenAddress,
      transactionType,
      amount,
      taxRate,
      taxAmount,
      netAmount,
      timestamp: Date.now(),
    };
    
    setCalculations([...calculations, calculation]);
    return calculation;
  };

  return { calculate, calculations, address };
}
