'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface QueuedTransaction {
  id: string;
  to: string;
  value: string;
  data: string;
  status: 'pending' | 'processing' | 'completed';
  wallet: string;
}

export function useTransactionQueueManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [queue, setQueue] = useState<QueuedTransaction[]>([]);

  const addToQueue = async (to: string, value: string, data: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Queue TX: ${to} ${value}`;
    await signMessageAsync({ message });
    
    const tx: QueuedTransaction = {
      id: `tx_${Date.now()}`,
      to,
      value,
      data,
      status: 'pending',
      wallet: address,
    };
    
    setQueue([...queue, tx]);
    return tx;
  };

  return { addToQueue, queue, address };
}


