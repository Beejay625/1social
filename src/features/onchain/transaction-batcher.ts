'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface BatchedTransaction {
  calls: Array<{
    target: string;
    data: string;
  }>;
  txHash: string;
}

export function useTransactionBatcher() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const [batchedTxs, setBatchedTxs] = useState<BatchedTransaction[]>([]);

  const batchTransactions = async (calls: Array<{ target: string; data: string }>) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'multicall',
      args: [calls],
    });

    const batched: BatchedTransaction = {
      calls,
      txHash: txHash || '',
    };

    setBatchedTxs([...batchedTxs, batched]);
    return txHash;
  };

  return { batchTransactions, batchedTxs, isConnected, address };
}

