'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BatchProcess {
  transactions: string[];
  processed: number;
  failed: number;
  wallet: string;
  timestamp: number;
}

export function useTransactionBatchProcessor() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [batches, setBatches] = useState<BatchProcess[]>([]);

  const processBatch = async (transactions: string[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Process Batch: ${transactions.length} transactions`;
    await signMessageAsync({ message });
    
    const batch: BatchProcess = {
      transactions,
      processed: 0,
      failed: 0,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setBatches([...batches, batch]);
    return batch;
  };

  return { processBatch, batches, address };
}


