'use client';

import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

export interface TransactionStatus {
  hash: string;
  status: 'pending' | 'success' | 'failed';
  blockNumber: bigint | null;
  confirmations: number;
}

export function useTransactionStatusChecker() {
  const { address } = useAccount();
  const { data: receipt } = useWaitForTransactionReceipt({
    hash: '0x' as `0x${string}`,
  });
  const [statuses, setStatuses] = useState<TransactionStatus[]>([]);

  const checkStatus = (hash: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const status: TransactionStatus = {
      hash,
      status: receipt?.status === 'success' ? 'success' : 'pending',
      blockNumber: receipt?.blockNumber || null,
      confirmations: receipt?.confirmations || 0,
    };
    
    setStatuses([...statuses, status]);
    return status;
  };

  return { checkStatus, statuses, address };
}
