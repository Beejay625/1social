'use client';

import { useAccount, useWatchContractEvent } from 'wagmi';
import { useState } from 'react';

export interface SubscribedEvent {
  contract: string;
  eventName: string;
  callback: (data: any) => void;
  active: boolean;
  timestamp: number;
}

export function useContractEventsSubscriber() {
  const { address } = useAccount();
  const [subscriptions, setSubscriptions] = useState<SubscribedEvent[]>([]);

  useWatchContractEvent({
    address: '0x' as `0x${string}`,
    abi: [],
    eventName: 'Transfer',
    onLogs(logs) {
      const subscription: SubscribedEvent = {
        contract: '0x',
        eventName: 'Transfer',
        callback: () => {},
        active: true,
        timestamp: Date.now(),
      };
      setSubscriptions([...subscriptions, subscription]);
    },
  });

  return { subscriptions, address };
}

