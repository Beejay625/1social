'use client';

import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

export interface RewardBoost {
  stakingPoolAddress: string;
  multiplier: number;
  duration: number;
  startTime: number;
  boostId: string;
}

export function useTokenStakingRewardBoosterV2() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [boosts, setBoosts] = useState<RewardBoost[]>([]);

  const createBoost = async (stakingPoolAddress: string, multiplier: number, duration: number) => {
    if (!address || !isConnected) throw new Error('Reown wallet not connected');
    if (multiplier <= 0) throw new Error('Multiplier must be greater than 0');
    
    const message = `Create reward boost: ${multiplier}x for ${duration} seconds`;
    await signMessageAsync({ message });
    
    const boost: RewardBoost = {
      stakingPoolAddress,
      multiplier,
      duration,
      startTime: Date.now(),
      boostId: `boost_${Date.now()}`,
    };
    
    setBoosts([...boosts, boost]);
    return boost;
  };

  return { 
    createBoost, 
    boosts, 
    address, 
    isConnected,
    hash,
    isPending,
    isConfirming,
    isConfirmed
  };
}

