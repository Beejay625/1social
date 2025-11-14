'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RemoveLiquidityConfig {
  poolAddress: string;
  lpAmount: bigint;
  minAmountA: bigint;
  minAmountB: bigint;
}

export function useTokenLiquidityRemoverV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [removing, setRemoving] = useState(false);

  const { data: lpBalance } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const remove = async (config: RemoveLiquidityConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setRemoving(true);

    try {
      const message = `Remove liquidity from pool: ${config.poolAddress}`;
      await signMessageAsync({ message });

      await writeContract({
        address: config.poolAddress as `0x${string}`,
        abi: [],
        functionName: 'removeLiquidity',
        args: [config.lpAmount, config.minAmountA, config.minAmountB, address],
      });
    } finally {
      setRemoving(false);
    }
  };

  return {
    remove,
    removing,
    address,
    isConnected,
    lpBalance,
  };
}
