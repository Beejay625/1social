'use client';

import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

export interface TransactionStatus {
  txHash: string;
  status: 'pending' | 'success' | 'failed';
  blockNumber: number | null;
  confirmations: number;
}

export function useTransactionStatusChecker() {
  const { address } = useAccount();
  const [transactions, setTransactions] = useState<TransactionStatus[]>([]);

  const checkStatus = async (txHash: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const status: TransactionStatus = {
      txHash,
      status: 'pending',
      blockNumber: null,
      confirmations: 0,
    };
    
    setTransactions([...transactions, status]);
    return status;
  };

  return { checkStatus, transactions, address };
}
