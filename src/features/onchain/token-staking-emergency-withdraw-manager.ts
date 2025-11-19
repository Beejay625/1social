'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export function useTokenStakingEmergencyWithdrawManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [withdrawing, setWithdrawing] = useState(false);

  const emergencyWithdraw = async (poolAddress: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setWithdrawing(true);

    try {
      const message = `Emergency withdraw from staking pool`;
      await signMessageAsync({ message });

      await writeContract({
        address: poolAddress as `0x${string}`,
        abi: [],
        functionName: 'emergencyWithdraw',
        args: [],
      });
    } finally {
      setWithdrawing(false);
    }
  };

  return {
    emergencyWithdraw,
    withdrawing,
    address,
    isConnected,
  };
}

