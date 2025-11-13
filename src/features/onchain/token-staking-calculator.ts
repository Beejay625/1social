'use client';

/**
 * Token Staking Calculator
 * Calculates staking rewards based on APY and duration using Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface StakingCalculation {
  principal: string;
  apy: number;
  duration: number;
  rewards: string;
  totalReturn: string;
  timestamp: number;
}

export function useTokenStakingCalculator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [calculations, setCalculations] = useState<StakingCalculation[]>([]);

  const calculate = async (
    principal: string,
    apy: number,
    durationDays: number
  ): Promise<StakingCalculation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (parseFloat(principal) <= 0 || apy < 0 || durationDays <= 0) {
      throw new Error('Principal, APY, and duration must be positive values');
    }
    
    const message = `Calculate staking rewards: ${principal} at ${apy}% APY`;
    await signMessageAsync({ message });
    
    const principalNum = parseFloat(principal);
    const years = durationDays / 365;
    const rewards = principalNum * (apy / 100) * years;
    const totalReturn = principalNum + rewards;
    
    const calculation: StakingCalculation = {
      principal,
      apy,
      duration: durationDays,
      rewards: rewards.toString(),
      totalReturn: totalReturn.toString(),
      timestamp: Date.now(),
    };
    
    setCalculations([...calculations, calculation]);
    return calculation;
  };

  return { calculate, calculations, address };
}

