'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RevenueSplit {
  contentHash: string;
  collaborators: string[];
  splitPercentages: number[];
  totalRevenue: bigint;
}

export function useOnchainCollaborationRevenueSplitter() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [splitting, setSplitting] = useState(false);

  const { data: revenueData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getRevenueSplit',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const splitRevenue = async (split: RevenueSplit) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setSplitting(true);

    try {
      const message = `Split revenue onchain among ${split.collaborators.length} collaborators`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'splitRevenue',
        args: [
          split.contentHash,
          split.collaborators,
          split.splitPercentages,
          split.totalRevenue,
        ],
      });
    } finally {
      setSplitting(false);
    }
  };

  return {
    splitRevenue,
    splitting,
    address,
    isConnected,
    revenueData,
  };
}

