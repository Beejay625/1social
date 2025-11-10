'use client';

import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

export interface TxStatus {
  hash: string;
  status: 'pending' | 'success' | 'failed';
  confirmations: number;
  timestamp: number;
}

export function useTransactionStatusChecker() {
  const { address } = useAccount();
  const [statuses, setStatuses] = useState<TxStatus[]>([]);

  const checkStatus = (hash: `0x${string}`) => {
    const { data: receipt } = useWaitForTransactionReceipt({
      hash,
      query: { enabled: !!hash },
    });

    if (receipt) {
      const status: TxStatus = {
        hash,
        status: receipt.status === 'success' ? 'success' : 'failed',
        confirmations: receipt.blockNumber ? 1 : 0,
        timestamp: Date.now(),
      };
      setStatuses([...statuses, status]);
      return status;
    }
    return null;
  };

  return { checkStatus, statuses, address };
}

