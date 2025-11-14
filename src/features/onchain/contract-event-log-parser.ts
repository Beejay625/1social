'use client';

import { useAccount, useWatchContractEvent } from 'wagmi';
import { useState, useEffect } from 'react';

export interface EventLog {
  contract: string;
  event: string;
  args: any;
  blockNumber: bigint;
  timestamp: number;
}

export function useContractEventLogParser() {
  const { address } = useAccount();
  const [logs, setLogs] = useState<EventLog[]>([]);

  useWatchContractEvent({
    address: '0x' as `0x${string}`,
    abi: [],
    eventName: 'Transfer',
    onLogs(logs) {
      if (address) {
        const log: EventLog = {
          contract: '0x',
          event: 'Transfer',
          args: logs[0]?.args,
          blockNumber: logs[0]?.blockNumber || 0n,
          timestamp: Date.now(),
        };
        setLogs([...logs, log]);
      }
    },
    enabled: !!address,
  });

  return { logs, address };
}


