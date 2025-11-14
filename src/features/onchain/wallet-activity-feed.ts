'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ActivityEvent {
  type: string;
  timestamp: number;
  txHash: string;
  value: string;
}

export function useWalletActivityFeed() {
  const { address } = useAccount();
  const { data: events } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getEvents',
    args: [address],
  });
  const [activities, setActivities] = useState<ActivityEvent[]>([]);

  useEffect(() => {
    if (!address || !events) return;
    // Parse events into activities
    setActivities([]);
  }, [address, events]);

  return { activities, address };
}


