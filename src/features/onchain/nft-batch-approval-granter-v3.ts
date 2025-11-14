'use client';

/**
 * NFT Batch Approval Granter V3
 * Grant batch approvals with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface BatchApproval {
  approvalId: string;
  collectionAddress: string;
  operator: string;
  tokenIds: string[];
  grantedBy: string;
  timestamp: number;
}

export function useNFTBatchApprovalGranterV3() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [approvals, setApprovals] = useState<BatchApproval[]>([]);

  const grantBatchApproval = async (
    collectionAddress: string,
    operator: string,
    tokenIds: string[]
  ): Promise<BatchApproval> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x') || !operator.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    if (tokenIds.length === 0) {
      throw new Error('Token IDs array cannot be empty');
    }
    
    const message = `Grant batch approval V3: ${collectionAddress} to ${operator} for ${tokenIds.length} tokens`;
    await signMessageAsync({ message });
    
    const approval: BatchApproval = {
      approvalId: `approval-v3-${Date.now()}`,
      collectionAddress,
      operator,
      tokenIds,
      grantedBy: address,
      timestamp: Date.now(),
    };
    
    setApprovals([...approvals, approval]);
    return approval;
  };

  return { grantBatchApproval, approvals, address };
}
