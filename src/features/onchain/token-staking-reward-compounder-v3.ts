'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface CompoundConfig {
  poolAddress: string;
  autoCompound: boolean;
  compoundThreshold: bigint;
}

export function useTokenStakingRewardCompounderV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [compounding, setCompounding] = useState(false);

  const { data: pendingRewards } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'pendingRewards',
    args: [address],
  });

  const { data: stakedAmount } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'balanceOf',
    args: [address],
  });

  const compoundRewards = async (config: CompoundConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setCompounding(true);

    try {
      const message = 'Compound staking rewards';
      await signMessageAsync({ message });

      await writeContract({
        address: config.poolAddress as `0x${string}`,
        abi: [],
        functionName: 'compound',
        args: [],
      });
    } finally {
      setCompounding(false);
    }
  };

  const enableAutoCompound = async (config: CompoundConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setCompounding(true);

    try {
      const message = 'Enable auto-compound';
      await signMessageAsync({ message });

      await writeContract({
        address: config.poolAddress as `0x${string}`,
        abi: [],
        functionName: 'setAutoCompound',
        args: [true, config.compoundThreshold],
      });
    } finally {
      setCompounding(false);
    }
  };

  return {
    compoundRewards,
    enableAutoCompound,
    compounding,
    address,
    isConnected,
    pendingRewards,
    stakedAmount,
  };
}

