'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ScheduledContent {
  contentHash: string;
  timestamp: number;
  protocols: string[];
  nftMint: boolean;
}

export function useOnchainContentSchedulerV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [scheduling, setScheduling] = useState(false);

  const { data: scheduledCount } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getScheduledCount',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const schedule = async (content: ScheduledContent) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setScheduling(true);

    try {
      const message = `Schedule content for ${new Date(content.timestamp).toISOString()}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'scheduleContent',
        args: [
          content.contentHash,
          content.timestamp,
          content.protocols,
          content.nftMint,
        ],
      });
    } finally {
      setScheduling(false);
    }
  };

  const cancelSchedule = async (contentHash: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setScheduling(true);

    try {
      const message = `Cancel scheduled content: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'cancelSchedule',
        args: [contentHash],
      });
    } finally {
      setScheduling(false);
    }
  };

  return {
    schedule,
    cancelSchedule,
    scheduling,
    address,
    isConnected,
    scheduledCount,
  };
}

