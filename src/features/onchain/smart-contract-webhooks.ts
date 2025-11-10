'use client';

import { useAccount, useWatchContractEvent } from 'wagmi';
import { useState } from 'react';

export interface WebhookEvent {
  eventName: string;
  data: any;
  blockNumber: bigint;
  timestamp: number;
}

export function useSmartContractWebhooks() {
  const { address, isConnected } = useAccount();
  const [events, setEvents] = useState<WebhookEvent[]>([]);

  useWatchContractEvent({
    address: '0x' as `0x${string}`,
    abi: [],
    eventName: 'Transfer',
    onLogs(logs) {
      const event: WebhookEvent = {
        eventName: 'Transfer',
        data: logs,
        blockNumber: logs[0]?.blockNumber || BigInt(0),
        timestamp: Date.now(),
      };
      setEvents([...events, event]);
    },
  });

  return { events, isConnected, address };
}
