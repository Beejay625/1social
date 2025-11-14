'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export function useTokenLockExtenderV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [extending, setExtending] = useState(false);

  const { data: lockData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getLock',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const extend = async (lockAddress: string, additionalDays: number) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setExtending(true);

    try {
      const message = `Extend lock by ${additionalDays} days`;
      await signMessageAsync({ message });

      await writeContract({
        address: lockAddress as `0x${string}`,
        abi: [],
        functionName: 'extendLock',
        args: [address, additionalDays],
      });
    } finally {
      setExtending(false);
    }
  };

  return {
    extend,
    extending,
    address,
    isConnected,
    lockData,
  };
}

