'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface LazyMintSchedule {
  collectionAddress: string;
  metadataURIs: string[];
  recipients: string[];
  scheduleTime: number;
}

export function useNFTLazyMintScheduler() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [scheduling, setScheduling] = useState(false);
  const [executing, setExecuting] = useState(false);

  const scheduleLazyMint = async (schedule: LazyMintSchedule) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setScheduling(true);

    try {
      const message = `Schedule lazy mint for ${schedule.metadataURIs.length} NFTs`;
      await signMessageAsync({ message });

      await writeContract({
        address: schedule.collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'scheduleLazyMint',
        args: [schedule.metadataURIs, schedule.recipients, schedule.scheduleTime],
      });
    } finally {
      setScheduling(false);
    }
  };

  const executeScheduledMint = async (collectionAddress: string, scheduleId: number) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setExecuting(true);

    try {
      const message = `Execute scheduled lazy mint: ${scheduleId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'executeScheduledMint',
        args: [scheduleId],
      });
    } finally {
      setExecuting(false);
    }
  };

  return {
    scheduleLazyMint,
    executeScheduledMint,
    scheduling,
    executing,
    address,
    isConnected,
  };
}

