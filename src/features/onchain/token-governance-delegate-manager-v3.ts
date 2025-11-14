'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export function useTokenGovernanceDelegateManagerV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [delegating, setDelegating] = useState(false);

  const { data: currentDelegate } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'delegates',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const delegate = async (governanceAddress: string, delegatee: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setDelegating(true);

    try {
      const message = `Delegate voting power to: ${delegatee}`;
      await signMessageAsync({ message });

      await writeContract({
        address: governanceAddress as `0x${string}`,
        abi: [],
        functionName: 'delegate',
        args: [delegatee],
      });
    } finally {
      setDelegating(false);
    }
  };

  return {
    delegate,
    delegating,
    address,
    isConnected,
    currentDelegate,
  };
}

