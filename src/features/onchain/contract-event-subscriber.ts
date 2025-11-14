'use client';

import { useAccount, useWatchContractEvent } from 'wagmi';
import { useState } from 'react';

export interface ContractEvent {
  eventName: string;
  data: any;
  blockNumber: bigint;
  timestamp: number;
}

export function useContractEventSubscriber() {
  const { address } = useAccount();
  const [events, setEvents] = useState<ContractEvent[]>([]);

  useWatchContractEvent({
    address: '0x' as `0x${string}`,
    abi: [],
    eventName: 'Transfer',
    onLogs(logs) {
      const event: ContractEvent = {
        eventName: 'Transfer',
        data: logs,
        blockNumber: logs[0]?.blockNumber || BigInt(0),
        timestamp: Date.now(),
      };
      setEvents([...events, event]);
    },
  });

  return { events, address };
}


