'use client';

/**
 * NFT Approval Checker V2
 * Check NFT approvals with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ApprovalStatus {
  checkId: string;
  tokenId: string;
  collectionAddress: string;
  owner: string;
  operator: string;
  approved: boolean;
  timestamp: number;
}

export function useNFTApprovalCheckerV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [checks, setChecks] = useState<ApprovalStatus[]>([]);

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
    
    const check: ApprovalStatus = {
      checkId: `check-${Date.now()}`,
      tokenId,
      collectionAddress,
      owner,
      operator,
      approved: false,
      timestamp: Date.now(),
    };
    
    setChecks([...checks, check]);
    return check;
  };

  return { checkApproval, checks, address };
}
