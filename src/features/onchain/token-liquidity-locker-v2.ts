'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface LockConfig {
  poolAddress: string;
  amount: bigint;
  duration: number;
}

export function useTokenLiquidityLockerV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [locking, setLocking] = useState(false);

  const { data: lockedAmount } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'lockedAmount',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const lock = async (config: LockConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setLocking(true);

    try {
      const message = `Lock ${config.amount} liquidity for ${config.duration} days`;
      await signMessageAsync({ message });

      await writeContract({
        address: config.poolAddress as `0x${string}`,
        abi: [],
        functionName: 'lockLiquidity',
        args: [config.amount, config.duration],
      });
    } finally {
      setLocking(false);
    }
  };

  return {
    lock,
    locking,
    address,
    isConnected,
    lockedAmount,
  };
}
