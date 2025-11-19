'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface VestingBatch {
  beneficiaries: string[];
  amounts: bigint[];
  startTime: number;
  duration: number;
}

export function useTokenVestingBatchCreator() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [creating, setCreating] = useState(false);

  const createBatchVesting = async (tokenAddress: string, batch: VestingBatch) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setCreating(true);

    try {
      const message = `Create vesting for ${batch.beneficiaries.length} recipients`;
      await signMessageAsync({ message });

      await writeContract({
        address: tokenAddress as `0x${string}`,
        abi: [],
        functionName: 'createBatchVesting',
        args: [batch.beneficiaries, batch.amounts, batch.startTime, batch.duration],
      });
    } finally {
      setCreating(false);
    }
  };

  return {
    createBatchVesting,
    creating,
    address,
    isConnected,
  };
}

