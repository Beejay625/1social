'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export function useTokenStakingLockExtensionManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [extending, setExtending] = useState(false);

  const extendLock = async (poolAddress: string, additionalDays: number) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setExtending(true);

    try {
      const message = `Extend staking lock by ${additionalDays} days`;
      await signMessageAsync({ message });

      await writeContract({
        address: poolAddress as `0x${string}`,
        abi: [],
        functionName: 'extendLock',
        args: [additionalDays],
      });
    } finally {
      setExtending(false);
    }
  };

  return {
    extendLock,
    extending,
    address,
    isConnected,
  };
}

