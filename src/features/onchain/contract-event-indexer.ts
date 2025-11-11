'use client';

import { useAccount, useWatchContractEvent } from 'wagmi';
import { useState } from 'react';

export interface EventIndex {
  contract: string;
  event: string;
  block: number;
  txHash: string;
  timestamp: number;
}

export function useContractEventIndexer() {
  const { address } = useAccount();
  const [events, setEvents] = useState<EventIndex[]>([]);

  useWatchContractEvent({
    address: '0x' as `0x${string}`,
    abi: [],
    eventName: 'Transfer',
    onLogs: (logs) => {
      if (address) {
        const event: EventIndex = {
          contract: '0x',
          event: 'Transfer',
          block: logs[0]?.blockNumber || 0,
          txHash: logs[0]?.transactionHash || '',
          timestamp: Date.now(),
        };
        setEvents([...events, event]);
      }
    },
  });

  return { events, address };
}

