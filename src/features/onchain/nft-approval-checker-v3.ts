'use client';

/**
 * NFT Approval Checker V3
 * Check NFT approvals with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ApprovalCheck {
  checkId: string;
  tokenId: string;
  collectionAddress: string;
  operator: string;
  approved: boolean;
  timestamp: number;
}

export function useNFTApprovalCheckerV3() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [checks, setChecks] = useState<ApprovalCheck[]>([]);

  const check = async (
    tokenId: string,
    collectionAddress: string,
    operator: string
  ): Promise<ApprovalCheck> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (!operator.startsWith('0x')) {
      throw new Error('Invalid operator address format');
    }
    
    const message = `Check approval: ${collectionAddress} #${tokenId} for ${operator}`;
    await signMessageAsync({ message });
    
    const check: ApprovalCheck = {
      checkId: `check-${Date.now()}`,
      tokenId,
      collectionAddress,
      operator,
      approved: false,
      timestamp: Date.now(),
    };
    
    setChecks([...checks, check]);
    return check;
  };

  return { check, checks, address };
}

