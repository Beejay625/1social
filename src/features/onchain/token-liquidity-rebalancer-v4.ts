'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RebalanceConfig {
  poolAddress: string;
  targetRatio: number;
  tolerance: number;
  autoRebalance: boolean;
}

export function useTokenLiquidityRebalancerV4() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [rebalancing, setRebalancing] = useState(false);

  const { data: currentRatio } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getRatio',
  });

  const rebalance = async (config: RebalanceConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setRebalancing(true);

    try {
      const message = `Rebalance liquidity to ${config.targetRatio}%`;
      await signMessageAsync({ message });

      await writeContract({
        address: config.poolAddress as `0x${string}`,
        abi: [],
        functionName: 'rebalance',
        args: [config.targetRatio, config.tolerance, config.autoRebalance],
      });
    } finally {
      setRebalancing(false);
    }
  };

  return {
    rebalance,
    rebalancing,
    address,
    isConnected,
    currentRatio,
  };
}

