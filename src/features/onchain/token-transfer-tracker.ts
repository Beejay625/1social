'use client';

import { useAccount, useWatchContractEvent } from 'wagmi';
import { useState } from 'react';

export interface Transfer {
  from: string;
  to: string;
  amount: bigint;
  token: string;
  timestamp: number;
}

export function useTokenTransferTracker() {
  const { address } = useAccount();
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  useWatchContractEvent({
    address: '0x' as `0x${string}`,
    abi: [],
    eventName: 'Transfer',
    onLogs(logs) {
      const transfer: Transfer = {
        from: logs[0]?.args?.from || '',
        to: logs[0]?.args?.to || '',
        amount: logs[0]?.args?.value || BigInt(0),
        token: '0x',
        timestamp: Date.now(),
      };
      setTransfers([...transfers, transfer]);
    },
  });

  return { transfers, address };
}

