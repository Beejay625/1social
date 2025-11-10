'use client';

import { useAccount } from 'wagmi';
import { useState } from 'react';

export interface BatchedTransaction {
  id: string;
  operations: string[];
  wallet: string;
  status: 'pending' | 'executed';
}

export function useTransactionBatcher() {
  const { address } = useAccount();
  const [batches, setBatches] = useState<BatchedTransaction[]>([]);

  const createBatch = async (operations: string[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const batch: BatchedTransaction = {
      id: `batch_${Date.now()}`,
      operations,
      wallet: address,
      status: 'pending',
    };
    
    setBatches([...batches, batch]);
    return batch;
  };

  return { createBatch, batches, address };
}
