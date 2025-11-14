'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BuiltTransaction {
  to: string;
  value: bigint;
  data: string;
  gasLimit: bigint;
  wallet: string;
  timestamp: number;
}

export function useTransactionBuilder() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [transactions, setTransactions] = useState<BuiltTransaction[]>([]);

  const buildTransaction = async (to: string, value: string, data: string, gasLimit: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Build TX: ${to} ${value}`;
    await signMessageAsync({ message });
    
    const tx: BuiltTransaction = {
      to,
      value: BigInt(value),
      data,
      gasLimit: BigInt(gasLimit),
      wallet: address,
      timestamp: Date.now(),
    };
    
    setTransactions([...transactions, tx]);
    return tx;
  };

  return { buildTransaction, transactions, address };
}


