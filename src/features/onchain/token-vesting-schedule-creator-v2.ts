'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface VestingSchedule {
  beneficiary: string;
  tokenAddress: string;
  totalAmount: bigint;
  startTime: number;
  duration: number;
  cliff: number;
  revocable: boolean;
}

export function useTokenVestingScheduleCreatorV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [creating, setCreating] = useState(false);

  const { data: vestingContract } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'vestingContract',
  });

  const createSchedule = async (schedule: VestingSchedule) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setCreating(true);

    try {
      const message = `Create vesting schedule for ${schedule.beneficiary}`;
      await signMessageAsync({ message });

      await writeContract({
        address: schedule.tokenAddress as `0x${string}`,
        abi: [],
        functionName: 'createVestingSchedule',
        args: [
          schedule.beneficiary,
          schedule.totalAmount,
          schedule.startTime,
          schedule.duration,
          schedule.cliff,
          schedule.revocable,
        ],
      });
    } finally {
      setCreating(false);
    }
  };

  return {
    createSchedule,
    creating,
    address,
    isConnected,
    vestingContract,
  };
}

