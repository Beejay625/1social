'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface BatchApproval {
  collection: string;
  operator: string;
  approved: boolean;
  tokenIds: string[];
}

export function useNFTBatchApproval() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [approvals, setApprovals] = useState<BatchApproval[]>([]);

  const batchApprove = async (collection: string, operator: string, tokenIds: string[], approved: boolean) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: collection as `0x${string}`,
      abi: [],
      functionName: 'setApprovalForAll',
      args: [operator, approved],
    });

    const approval: BatchApproval = {
      collection,
      operator,
      approved,
      tokenIds,
    };

    setApprovals([...approvals, approval]);
    return txHash;
  };

  return { batchApprove, approvals, address };
}


