'use client';

import { useAccount, useWatchContractEvent } from 'wagmi';
import { useState } from 'react';

export interface IndexedEvent {
  contract: string;
  eventName: string;
  blockNumber: bigint;
  transactionHash: string;
  args: any;
  timestamp: number;
}

export function useEventIndexer() {
  const { address } = useAccount();
  const [events, setEvents] = useState<IndexedEvent[]>([]);

  useWatchContractEvent({
    address: '0x' as `0x${string}`,
    abi: [],
    eventName: 'Transfer',
    onLogs(logs) {
      const event: IndexedEvent = {
        contract: '0x',
        eventName: 'Transfer',
        blockNumber: logs[0]?.blockNumber || BigInt(0),
        transactionHash: logs[0]?.transactionHash || '',
        args: logs[0]?.args || {},
        timestamp: Date.now(),
      };
      setEvents([...events, event]);
    },
  });

  return { events, address };
}


