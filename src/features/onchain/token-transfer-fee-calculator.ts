'use client';

/**
 * Token Transfer Fee Calculator
 * Calculates transfer fees for token transactions using Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TransferFee {
  tokenAddress: string;
  amount: string;
  feePercentage: number;
  feeAmount: string;
  netAmount: string;
}

export function useTokenTransferFeeCalculator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [calculations, setCalculations] = useState<TransferFee[]>([]);

  const calculateFee = async (
    tokenAddress: string,
    amount: string,
    feePercentage: number
  ): Promise<TransferFee> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Calculate transfer fee: ${tokenAddress} ${amount}`;
    await signMessageAsync({ message });
    
    const feeAmount = (BigInt(amount) * BigInt(Math.floor(feePercentage * 100))) / BigInt(10000);
    const netAmount = BigInt(amount) - feeAmount;
    
    const fee: TransferFee = {
      tokenAddress,
      amount,
      feePercentage,
      feeAmount: feeAmount.toString(),
      netAmount: netAmount.toString(),
    };
    
    setCalculations([...calculations, fee]);
    return fee;
  };

  return { calculateFee, calculations, address };
}

