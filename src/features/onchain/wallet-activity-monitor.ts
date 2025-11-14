'use client';

/**
 * Wallet Activity Monitor
 * Monitor wallet activity including transfers, swaps, and mints with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ActivityRecord {
  recordId: string;
  walletAddress: string;
  activityType: 'transfer' | 'swap' | 'mint' | 'burn';
  details: string;
  monitoredBy: string;
  timestamp: number;
}

export function useWalletActivityMonitor() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [records, setRecords] = useState<ActivityRecord[]>([]);

  const monitorActivity = async (
    walletAddress: string,
    activityType: 'transfer' | 'swap' | 'mint' | 'burn',
    details: string
  ): Promise<ActivityRecord> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!walletAddress.startsWith('0x')) {
      throw new Error('Invalid wallet address format');
    }
    
    const message = `Monitor activity: ${walletAddress} type ${activityType}`;
    await signMessageAsync({ message });
    
    const record: ActivityRecord = {
      recordId: `activity-${Date.now()}`,
      walletAddress,
      activityType,
      details,
      monitoredBy: address,
      timestamp: Date.now(),
    };
    
    setRecords([...records, record]);
    return record;
  };

  return { monitorActivity, records, address };
}
