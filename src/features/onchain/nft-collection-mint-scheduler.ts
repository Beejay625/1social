'use client';

/**
 * NFT Collection Mint Scheduler
 * Schedule NFT mints with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface MintSchedule {
  scheduleId: string;
  collectionAddress: string;
  mintTime: number;
  quantity: number;
  price: string;
  scheduledBy: string;
  active: boolean;
  timestamp: number;
}

export function useNFTCollectionMintScheduler() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [schedules, setSchedules] = useState<MintSchedule[]>([]);

  const scheduleMint = async (
    collectionAddress: string,
    mintTime: number,
    quantity: number,
    price: string
  ): Promise<MintSchedule> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (mintTime <= Date.now()) {
      throw new Error('Mint time must be in the future');
    }
    
    const message = `Schedule mint: ${collectionAddress} at ${mintTime} quantity ${quantity}`;
    await signMessageAsync({ message });
    
    const schedule: MintSchedule = {
      scheduleId: `mint-${Date.now()}`,
      collectionAddress,
      mintTime,
      quantity,
      price,
      scheduledBy: address,
      active: true,
      timestamp: Date.now(),
    };
    
    setSchedules([...schedules, schedule]);
    return schedule;
  };

  return { scheduleMint, schedules, address };
}

