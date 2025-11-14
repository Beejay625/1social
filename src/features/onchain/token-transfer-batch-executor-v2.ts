'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BatchTransfer {
  tokenAddress: string;
  recipients: string[];
  amounts: bigint[];
}

export function useTokenTransferBatchExecutorV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [executing, setExecuting] = useState(false);
  const [progress, setProgress] = useState(0);

  const executeBatchTransfers = async (transfers: BatchTransfer[]) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setExecuting(true);
    setProgress(0);

    try {
      const message = `Execute batch transfers for ${transfers.length} tokens`;
      await signMessageAsync({ message });

      for (let i = 0; i < transfers.length; i++) {
        const transfer = transfers[i];
        await writeContract({
          address: transfer.tokenAddress as `0x${string}`,
          abi: [],
          functionName: 'batchTransfer',
          args: [transfer.recipients, transfer.amounts],
        });
        setProgress(Math.round(((i + 1) / transfers.length) * 100));
      }
    } finally {
      setExecuting(false);
    }
  };

  return {
    executeBatchTransfers,
    executing,
    progress,
    address,
    isConnected,
  };
}

