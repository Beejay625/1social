'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface BatchTransfer {
  id: string;
  collection: string;
  tokenIds: bigint[];
  recipients: string[];
  completed: boolean;
}

export function useNFTBatchTransfer() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [transfers, setTransfers] = useState<BatchTransfer[]>([]);

  const batchTransfer = async (collection: string, tokenIds: string[], recipients: string[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: collection as `0x${string}`,
      abi: [],
      functionName: 'batchTransfer',
      args: [tokenIds.map(id => BigInt(id)), recipients],
    });

    const transfer: BatchTransfer = {
      id: txHash || '',
      collection,
      tokenIds: tokenIds.map(id => BigInt(id)),
      recipients,
      completed: true,
    };

    setTransfers([...transfers, transfer]);
    return txHash;
  };

  return { batchTransfer, transfers, address };
}


