'use client';

/**
 * Token Transfer Fee Calculator
 * Calculate transfer fees for token transactions with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface FeeCalculation {
  calculationId: string;
  tokenAddress: string;
  amount: string;
  transferType: 'standard' | 'tax' | 'reflection';
  feeRate: number;
  feeAmount: string;
  netAmount: string;
  timestamp: number;
}

export function useTokenTransferFeeCalculator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [calculations, setCalculations] = useState<FeeCalculation[]>([]);

  const calculate = async (
    tokenAddress: string,
    amount: string,
    transferType: 'standard' | 'tax' | 'reflection',
    feeRate: number
  ): Promise<FeeCalculation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    if (feeRate < 0 || feeRate > 100) {
      throw new Error('Fee rate must be between 0 and 100');
    }
    
    const message = `Calculate transfer fee: ${tokenAddress} ${transferType} ${amount}`;
    await signMessageAsync({ message });
    
    const feeAmount = (parseFloat(amount) * feeRate / 100).toString();
    const netAmount = (parseFloat(amount) - parseFloat(feeAmount)).toString();
    
    const calculation: FeeCalculation = {
      calculationId: `fee-${Date.now()}`,
      tokenAddress,
      amount,
      transferType,
      feeRate,
      feeAmount,
      netAmount,
      timestamp: Date.now(),
    };
    
    setCalculations([...calculations, calculation]);
    return calculation;
  };

  return { calculate, calculations, address };
}
