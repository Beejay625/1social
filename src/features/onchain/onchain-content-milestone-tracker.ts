'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Milestone {
  contentHash: string;
  milestoneType: string;
  targetValue: bigint;
  reward: bigint;
  achieved: boolean;
}

export function useOnchainContentMilestoneTracker() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [tracking, setTracking] = useState(false);

  const { data: milestoneData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getMilestones',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const createMilestone = async (milestone: Milestone) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setTracking(true);

    try {
      const message = `Create milestone onchain: ${milestone.milestoneType} for ${milestone.contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'createMilestone',
        args: [
          milestone.contentHash,
          milestone.milestoneType,
          milestone.targetValue,
          milestone.reward,
        ],
      });
    } finally {
      setTracking(false);
    }
  };

  return {
    createMilestone,
    tracking,
    address,
    isConnected,
    milestoneData,
  };
}

