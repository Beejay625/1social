'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface StakingPoolConfig {
  tokenAddress: string;
  rewardTokenAddress: string;
  rewardRate: bigint;
  lockPeriod: number;
}

export function useTokenStakingPoolCreatorV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [creating, setCreating] = useState(false);

  const create = async (factoryAddress: string, config: StakingPoolConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setCreating(true);

    try {
      const message = `Create staking pool for token: ${config.tokenAddress}`;
      await signMessageAsync({ message });

      await writeContract({
        address: factoryAddress as `0x${string}`,
        abi: [],
        functionName: 'createStakingPool',
        args: [
          config.tokenAddress,
          config.rewardTokenAddress,
          config.rewardRate,
          config.lockPeriod,
        ],
      });
    } finally {
      setCreating(false);
    }
  };

  return {
    create,
    creating,
    address,
    isConnected,
  };
}
