'use client';

import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

export interface ConfirmationData {
  txHash: string;
  status: 'pending' | 'success' | 'failed';
  confirmations: number;
  blockNumber: bigint | null;
}

export function useTransactionConfirmationTracker() {
  const { address } = useAccount();
  const { data: receipt } = useWaitForTransactionReceipt({
    hash: '0x' as `0x${string}`,
  });
  const [confirmations, setConfirmations] = useState<ConfirmationData[]>([]);

  const trackConfirmation = (txHash: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const confirmation: ConfirmationData = {
      txHash,
      status: receipt?.status === 'success' ? 'success' : 'pending',
      confirmations: receipt?.confirmations || 0,
      blockNumber: receipt?.blockNumber || null,
    };
    
    setConfirmations([...confirmations, confirmation]);
    return confirmation;
  };

  return { trackConfirmation, confirmations, address };
}

