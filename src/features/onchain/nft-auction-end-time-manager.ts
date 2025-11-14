'use client';

/**
 * NFT Auction End Time Manager
 * Manage auction end times with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface EndTimeManagement {
  managementId: string;
  auctionId: string;
  newEndTime: number;
  action: 'extend' | 'reduce' | 'set';
  managedBy: string;
  timestamp: number;
}

export function useNFTAuctionEndTimeManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [managements, setManagements] = useState<EndTimeManagement[]>([]);

  const manageEndTime = async (
    auctionId: string,
    newEndTime: number,
    action: 'extend' | 'reduce' | 'set'
  ): Promise<EndTimeManagement> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!auctionId || auctionId.trim() === '') {
      throw new Error('Auction ID is required');
    }
    if (newEndTime <= Date.now()) {
      throw new Error('End time must be in the future');
    }
    
    const message = `Manage end time: ${auctionId} ${action} to ${newEndTime}`;
    await signMessageAsync({ message });
    
    const management: EndTimeManagement = {
      managementId: `endtime-${Date.now()}`,
      auctionId,
      newEndTime,
      action,
      managedBy: address,
      timestamp: Date.now(),
    };
    
    setManagements([...managements, management]);
    return management;
  };

  return { manageEndTime, managements, address };
}
