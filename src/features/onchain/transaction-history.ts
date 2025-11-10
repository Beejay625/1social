'use client';

import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: bigint;
  timestamp: number;
}

export function useTransactionHistory() {
  const { address } = useAccount();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    if (address) {
      const tx: Transaction = {
        hash: `0x${Date.now().toString(16)}`,
        from: address,
        to: '0x',
        value: BigInt(0),
        timestamp: Date.now(),
      };
      setTransactions([tx]);
    }
  }, [address]);

  return { transactions, address };
}

