'use client';

import { useAccount, useWatchContractEvent } from 'wagmi';
import { useState } from 'react';

export interface Activity {
  type: string;
  from: string;
  to: string;
  value: bigint;
  timestamp: number;
}

export function useWalletActivityMonitor() {
  const { address } = useAccount();
  const [activities, setActivities] = useState<Activity[]>([]);

  useWatchContractEvent({
    address: '0x' as `0x${string}`,
    abi: [],
    eventName: 'Transfer',
    onLogs(logs) {
      const activity: Activity = {
        type: 'Transfer',
        from: logs[0]?.args?.from || '',
        to: logs[0]?.args?.to || '',
        value: logs[0]?.args?.value || BigInt(0),
        timestamp: Date.now(),
      };
      setActivities([...activities, activity]);
    },
  });

  return { activities, address };
}

