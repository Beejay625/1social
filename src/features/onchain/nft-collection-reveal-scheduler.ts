'use client';

/**
 * NFT Collection Reveal Scheduler
 * Schedule collection reveals with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface RevealSchedule {
  scheduleId: string;
  collectionAddress: string;
  revealTime: number;
  revealUri: string;
  scheduledBy: string;
  active: boolean;
  timestamp: number;
}

export function useNFTCollectionRevealScheduler() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [schedules, setSchedules] = useState<RevealSchedule[]>([]);

  const scheduleReveal = async (
    collectionAddress: string,
    revealTime: number,
    revealUri: string
  ): Promise<RevealSchedule> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (revealTime <= Date.now()) {
      throw new Error('Reveal time must be in the future');
    }
    
    const message = `Schedule reveal: ${collectionAddress} at ${revealTime}`;
    await signMessageAsync({ message });
    
    const schedule: RevealSchedule = {
      scheduleId: `reveal-${Date.now()}`,
      collectionAddress,
      revealTime,
      revealUri,
      scheduledBy: address,
      active: true,
      timestamp: Date.now(),
    };
    
    setSchedules([...schedules, schedule]);
    return schedule;
  };

  return { scheduleReveal, schedules, address };
}

