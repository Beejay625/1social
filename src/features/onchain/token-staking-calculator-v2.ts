'use client';

import { useAccount, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface StakingCalculation {
  principal: bigint;
  apy: number;
  duration: number;
  estimatedRewards: bigint;
}

export function useTokenStakingCalculatorV2() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [calculation, setCalculation] = useState<StakingCalculation | null>(null);

  const { data: apy } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getAPY',
    query: { enabled: isConnected },
  });

  const calculate = async (principal: bigint, duration: number) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');

    const message = `Calculate staking rewards: ${principal} for ${duration} days`;
    await signMessageAsync({ message });

    const apyValue = apy ? Number(apy) : 10;
    const estimatedRewards = (principal * BigInt(Math.floor(apyValue * duration / 365))) / 100n;

    const calc: StakingCalculation = {
      principal,
      apy: apyValue,
      duration,
      estimatedRewards,
    };

    setCalculation(calc);
    return calc;
  };

  return {
    calculate,
    calculation,
    address,
    isConnected,
    apy,
  };
}

