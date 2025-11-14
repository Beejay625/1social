'use client';

/**
 * Token Liquidity Pool Impermanent Loss Calculator
 * Calculate impermanent loss for liquidity positions with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface ImpermanentLossCalculation {
  calculationId: string;
  poolAddress: string;
  initialPrice: string;
  currentPrice: string;
  impermanentLoss: string;
  lossPercent: number;
  timestamp: number;
}

export function useTokenLiquidityPoolImpermanentLossCalculator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [calculations, setCalculations] = useState<ImpermanentLossCalculation[]>([]);

  const calculate = async (
    poolAddress: string,
    initialPrice: string,
    currentPrice: string
  ): Promise<ImpermanentLossCalculation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!poolAddress.startsWith('0x')) {
      throw new Error('Invalid pool address format');
    }
    
    const message = `Calculate impermanent loss: ${poolAddress} from ${initialPrice} to ${currentPrice}`;
    await signMessageAsync({ message });
    
    const priceRatio = parseFloat(currentPrice) / parseFloat(initialPrice);
    const impermanentLoss = Math.abs(2 * Math.sqrt(priceRatio) / (1 + priceRatio) - 1);
    const lossPercent = impermanentLoss * 100;
    
    const calculation: ImpermanentLossCalculation = {
      calculationId: `il-${Date.now()}`,
      poolAddress,
      initialPrice,
      currentPrice,
      impermanentLoss: impermanentLoss.toString(),
      lossPercent,
      timestamp: Date.now(),
    };
    
    setCalculations([...calculations, calculation]);
    return calculation;
  };

  return { calculate, calculations, address };
}

