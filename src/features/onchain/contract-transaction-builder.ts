'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Transaction {
  to: string;
  data: string;
  value: bigint;
  gas: bigint;
  wallet: string;
  timestamp: number;
}

export function useContractTransactionBuilder() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const buildTransaction = async (to: string, data: string, value: bigint, gas: bigint) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Build Transaction: ${to}`;
    await signMessageAsync({ message });
    
    const tx: Transaction = {
      to,
      data,
      value,
      gas,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setTransactions([...transactions, tx]);
    return tx;
  };

  return { buildTransaction, transactions, address };
}

