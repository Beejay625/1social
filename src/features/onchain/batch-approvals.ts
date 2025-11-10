'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface ApprovalBatch {
  id: string;
  token: string;
  spender: string;
  amount: bigint;
  approved: boolean;
}

export function useBatchApprovals() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [batches, setBatches] = useState<ApprovalBatch[]>([]);

  const batchApprove = async (token: string, spender: string, amount: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: token as `0x${string}`,
      abi: [],
      functionName: 'approve',
      args: [spender, BigInt(amount)],
    });

    const batch: ApprovalBatch = {
      id: txHash || '',
      token,
      spender,
      amount: BigInt(amount),
      approved: true,
    };

    setBatches([...batches, batch]);
    return txHash;
  };

  return { batchApprove, batches, address };
}

