'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface StakingPoolConfig {
  tokenAddress: string;
  rewardTokenAddress: string;
  rewardRate: bigint;
  lockPeriod: number;
  minStakeAmount: bigint;
  maxStakeAmount: bigint;
}

export function useTokenStakingPoolCreatorV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [creating, setCreating] = useState(false);

  const { data: poolCount } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'poolCount',
  });

  const createPool = async (config: StakingPoolConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setCreating(true);

    try {
      const message = `Create staking pool for token ${config.tokenAddress}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'createStakingPool',
        args: [
          config.tokenAddress,
          config.rewardTokenAddress,
          config.rewardRate,
          config.lockPeriod,
          config.minStakeAmount,
          config.maxStakeAmount,
        ],
      });
    } finally {
      setCreating(false);
    }
  };

  return {
    createPool,
    creating,
    address,
    isConnected,
    poolCount,
  };
}

