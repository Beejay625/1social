'use client';

import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { useState, useEffect } from 'react';

export interface Receipt {
  hash: string;
  status: string;
  blockNumber: bigint;
  gasUsed: bigint;
  timestamp: number;
}

export function useContractReceiptReader() {
  const { address } = useAccount();
  const [receipts, setReceipts] = useState<Receipt[]>([]);

  const { data: receiptData } = useWaitForTransactionReceipt({
    hash: '0x' as `0x${string}`,
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (address && receiptData) {
      const receipt: Receipt = {
        hash: receiptData.transactionHash,
        status: receiptData.status,
        blockNumber: receiptData.blockNumber,
        gasUsed: receiptData.gasUsed,
        timestamp: Date.now(),
      };
      setReceipts([receipt]);
    }
  }, [address, receiptData]);

  return { receipts, address };
}

