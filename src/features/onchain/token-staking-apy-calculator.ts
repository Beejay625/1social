'use client';

/**
 * Token Staking APY Calculator
 * Calculate staking APY with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface APYCalculation {
  calculationId: string;
  stakingPool: string;
  stakedAmount: string;
  rewardRate: number;
  apy: number;
  estimatedRewards: string;
  timestamp: number;
}

export function useTokenStakingAPYCalculator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [calculations, setCalculations] = useState<APYCalculation[]>([]);

  const calculate = async (
    stakingPool: string,
    stakedAmount: string,
    rewardRate: number
  ): Promise<APYCalculation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!stakingPool.startsWith('0x')) {
      throw new Error('Invalid staking pool address format');
    }
    if (rewardRate < 0) {
      throw new Error('Reward rate cannot be negative');
    }
    
    const message = `Calculate APY: ${stakingPool} staked ${stakedAmount}`;
    await signMessageAsync({ message });
    
    const apy = rewardRate * 365;
    const estimatedRewards = (parseFloat(stakedAmount) * apy / 100).toString();
    
    const calculation: APYCalculation = {
      calculationId: `apy-${Date.now()}`,
      stakingPool,
      stakedAmount,
      rewardRate,
      apy,
      estimatedRewards,
      timestamp: Date.now(),
    };
    
    setCalculations([...calculations, calculation]);
    return calculation;
  };

  return { calculate, calculations, address };
}

