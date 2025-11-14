'use client';

/**
 * Token Transfer Fee Calculator V2
 * Enhanced transfer fee calculations with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface FeeCalculation {
  calculationId: string;
  tokenAddress: string;
  amount: string;
  baseFee: string;
  percentageFee: string;
  totalFee: string;
  calculatedBy: string;
  timestamp: number;
}

export function useTokenTransferFeeCalculatorV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [calculations, setCalculations] = useState<FeeCalculation[]>([]);

  const calculateFee = async (
    tokenAddress: string,
    amount: string
  ): Promise<FeeCalculation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    
    const message = `Calculate transfer fee: ${tokenAddress} amount ${amount}`;
    await signMessageAsync({ message });
    
    const baseFee = '0.001';
    const percentageFee = (parseFloat(amount) * 0.001).toFixed(6);
    const totalFee = (parseFloat(baseFee) + parseFloat(percentageFee)).toFixed(6);
    
    const calculation: FeeCalculation = {
      calculationId: `fee-${Date.now()}`,
      tokenAddress,
      amount,
      baseFee,
      percentageFee,
      totalFee,
      calculatedBy: address,
      timestamp: Date.now(),
    };
    
    setCalculations([...calculations, calculation]);
    return calculation;
  };

  const estimateTotalCost = async (
    tokenAddress: string,
    amount: string
  ): Promise<string> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Estimate total cost for ${tokenAddress} amount ${amount}`;
    await signMessageAsync({ message });
    
    const fee = await calculateFee(tokenAddress, amount);
    return (parseFloat(amount) + parseFloat(fee.totalFee)).toFixed(6);
  };

  return { calculateFee, estimateTotalCost, calculations, address };
}

