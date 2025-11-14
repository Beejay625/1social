'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export function useTokenVestingReleaserV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [releasing, setReleasing] = useState(false);

  const { data: releasable } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'releasable',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const release = async (vestingAddress: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setReleasing(true);

    try {
      const message = `Release vested tokens`;
      await signMessageAsync({ message });

      await writeContract({
        address: vestingAddress as `0x${string}`,
        abi: [],
        functionName: 'release',
        args: [address],
      });
    } finally {
      setReleasing(false);
    }
  };

  return {
    release,
    releasing,
    address,
    isConnected,
    releasable,
  };
}

