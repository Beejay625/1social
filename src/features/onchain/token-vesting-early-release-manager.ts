'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface EarlyReleaseConfig {
  vestingScheduleId: number;
  amount: bigint;
  penaltyPercentage: number;
}

export function useTokenVestingEarlyReleaseManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [releasing, setReleasing] = useState(false);

  const { data: vestingSchedules } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getVestingSchedules',
    args: [address],
  });

  const { data: vestedAmount } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getVestedAmount',
    args: [address, BigInt(0)],
  });

  const calculatePenalty = (amount: bigint, penaltyPercentage: number): bigint => {
    return (amount * BigInt(penaltyPercentage)) / BigInt(100);
  };

  const requestEarlyRelease = async (config: EarlyReleaseConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setReleasing(true);

    try {
      const penalty = calculatePenalty(config.amount, config.penaltyPercentage);
      const releaseAmount = config.amount - penalty;

      const message = `Request early release: ${releaseAmount} (penalty: ${penalty})`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'requestEarlyRelease',
        args: [config.vestingScheduleId, config.amount, config.penaltyPercentage],
      });
    } finally {
      setReleasing(false);
    }
  };

  return {
    requestEarlyRelease,
    calculatePenalty,
    releasing,
    address,
    isConnected,
    vestingSchedules,
    vestedAmount,
  };
}

