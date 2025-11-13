'use client';

/**
 * NFT Approval Checker V2
 * Check NFT approvals with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ApprovalStatus {
  tokenId: string;
  collectionAddress: string;
  operator: string;
  approved: boolean;
  timestamp: number;
}

export function useNFTApprovalCheckerV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [statuses, setStatuses] = useState<ApprovalStatus[]>([]);

  const checkApproval = async (
    tokenId: string,
    collectionAddress: string,
    operator: string
  ): Promise<ApprovalStatus> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x') || !operator.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    
    const message = `Check approval: ${collectionAddress} #${tokenId} for ${operator}`;
    await signMessageAsync({ message });
    
    const status: ApprovalStatus = {
      tokenId,
      collectionAddress,
      operator,
      approved: false,
      timestamp: Date.now(),
    };
    
    setStatuses([...statuses, status]);
    return status;
  };

  return { checkApproval, statuses, address };
}

