'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TaxCalculation {
  id: string;
  calculator: string;
  tokenAddress: string;
  amount: string;
  buyTax: number;
  sellTax: number;
  taxAmount: string;
  netAmount: string;
  timestamp: number;
}

export function useSocialTokenTaxCalculator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [calculations, setCalculations] = useState<TaxCalculation[]>([]);

  const calculateTax = async (
    tokenAddress: string,
    amount: string,
    buyTax: number,
    sellTax: number,
    isBuy: boolean
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const taxRate = isBuy ? buyTax : sellTax;
    const taxAmount = (BigInt(amount) * BigInt(taxRate)) / BigInt(100);
    const netAmount = BigInt(amount) - taxAmount;
    
    const message = `Calculate Tax: ${tokenAddress} ${amount} tax ${taxRate}%`;
    await signMessageAsync({ message });
    
    const calculation: TaxCalculation = {
      id: `tax-${Date.now()}`,
      calculator: address,
      tokenAddress,
      amount,
      buyTax,
      sellTax,
      taxAmount: taxAmount.toString(),
      netAmount: netAmount.toString(),
      timestamp: Date.now(),
    };
    
    setCalculations([...calculations, calculation]);
    return calculation;
  };

  return { calculateTax, calculations, address };
}


