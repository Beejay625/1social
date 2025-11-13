'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: bigint;
  timestamp: number;
}

export function useContractTransactionHistory() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = async (hash: string, from: string, to: string, value: bigint) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Add Transaction: ${hash}`;
    await signMessageAsync({ message });
    
    const tx: Transaction = {
      hash,
      from,
      to,
      value,
      timestamp: Date.now(),
    };
    
    setTransactions([...transactions, tx]);
    return tx;
  };

  return { addTransaction, transactions, address };
}

