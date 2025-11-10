'use client';

import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

export interface ReceiptInfo {
  hash: string;
  blockNumber: bigint;
  gasUsed: bigint;
  status: 'success' | 'failed';
  timestamp: number;
}

export function useTransactionReceiptReader() {
  const { address } = useAccount();
  const [receipts, setReceipts] = useState<ReceiptInfo[]>([]);

  const readReceipt = (hash: `0x${string}`) => {
    const { data: receipt } = useWaitForTransactionReceipt({
      hash,
      query: { enabled: !!hash },
    });

    if (receipt) {
      const receiptInfo: ReceiptInfo = {
        hash,
        blockNumber: receipt.blockNumber || BigInt(0),
        gasUsed: receipt.gasUsed || BigInt(0),
        status: receipt.status === 'success' ? 'success' : 'failed',
        timestamp: Date.now(),
      };
      setReceipts([...receipts, receiptInfo]);
      return receiptInfo;
    }
    return null;
  };

  return { readReceipt, receipts, address };
}

