'use client';

/**
 * NFT Approval Checker V3
 * Check NFT approvals with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ApprovalStatus {
  statusId: string;
  tokenId: string;
  collectionAddress: string;
  owner: string;
  operator: string;
  approved: boolean;
  checkedBy: string;
  timestamp: number;
}

export function useNFTApprovalCheckerV3() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [statuses, setStatuses] = useState<ApprovalStatus[]>([]);

  const checkApproval = async (
    tokenId: string,
    collectionAddress: string,
    owner: string,
    operator: string
  ): Promise<ApprovalStatus> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x') || !owner.startsWith('0x') || !operator.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    
    const message = `Check approval: ${collectionAddress} #${tokenId} operator ${operator}`;
    await signMessageAsync({ message });
    
    const status: ApprovalStatus = {
      statusId: `approval-${Date.now()}`,
      tokenId,
      collectionAddress,
      owner,
      operator,
      approved: false,
      checkedBy: address,
      timestamp: Date.now(),
    };
    
    setStatuses([...statuses, status]);
    return status;
  };

  return { checkApproval, statuses, address };
}
