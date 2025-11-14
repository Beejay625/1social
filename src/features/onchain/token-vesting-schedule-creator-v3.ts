'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface VestingSchedule {
  beneficiary: string;
  amount: bigint;
  startTime: number;
  duration: number;
  cliff: number;
}

export function useTokenVestingScheduleCreatorV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [creating, setCreating] = useState(false);

  const create = async (vestingAddress: string, schedule: VestingSchedule) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setCreating(true);

    try {
      const message = `Create vesting schedule for ${schedule.beneficiary}`;
      await signMessageAsync({ message });

      await writeContract({
        address: vestingAddress as `0x${string}`,
        abi: [],
        functionName: 'createVestingSchedule',
        args: [
          schedule.beneficiary,
          schedule.amount,
          schedule.startTime,
          schedule.duration,
          schedule.cliff,
        ],
      });
    } finally {
      setCreating(false);
    }
  };

  return {
    create,
    creating,
    address,
    isConnected,
  };
}

