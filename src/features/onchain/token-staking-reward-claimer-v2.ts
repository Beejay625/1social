'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export function useTokenStakingRewardClaimerV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [claiming, setClaiming] = useState(false);

  const { data: pendingRewards } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'pendingRewards',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const claim = async (poolAddress: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setClaiming(true);

    try {
      const message = `Claim staking rewards from pool: ${poolAddress}`;
      await signMessageAsync({ message });

      await writeContract({
        address: poolAddress as `0x${string}`,
        abi: [],
        functionName: 'claimRewards',
        args: [address],
      });
    } finally {
      setClaiming(false);
    }
  };

  return {
    claim,
    claiming,
    address,
    isConnected,
    pendingRewards,
  };
}

