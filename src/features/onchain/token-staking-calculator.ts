'use client';

/**
 * Token Staking Calculator
 * Calculate staking rewards based on APY and duration with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface StakingCalculation {
  calculationId: string;
  poolId: string;
  stakedAmount: string;
  apy: number;
  duration: number;
  estimatedReward: string;
  calculatedBy: string;
  timestamp: number;
}

export function useTokenStakingCalculator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [calculations, setCalculations] = useState<StakingCalculation[]>([]);

  const calculateStaking = async (
    poolId: string,
    stakedAmount: string,
    apy: number,
    duration: number
  ): Promise<StakingCalculation> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Calculate staking: ${poolId} amount ${stakedAmount} APY ${apy}% duration ${duration} days`;
    await signMessageAsync({ message });
    
    const estimatedReward = (parseFloat(stakedAmount) * (apy / 100) * (duration / 365)).toFixed(4);
    
    const calculation: StakingCalculation = {
      calculationId: `staking-calc-${Date.now()}`,
      poolId,
      stakedAmount,
      apy,
      duration,
      estimatedReward,
      calculatedBy: address,
      timestamp: Date.now(),
    };
    
    setCalculations([...calculations, calculation]);
    return calculation;
  };

  return { calculateStaking, calculations, address };
}
