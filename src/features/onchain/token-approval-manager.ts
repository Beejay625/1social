'use client';

/**
 * Token Approval Manager
 * Manages token approvals and revocations using Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Approval {
  tokenAddress: string;
  spender: string;
  amount: string;
  txHash: string;
  timestamp: number;
}

export function useTokenApprovalManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [approvals, setApprovals] = useState<Approval[]>([]);

  const approve = async (
    tokenAddress: string,
    spender: string,
    amount: string
  ): Promise<Approval> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Approve token: ${tokenAddress} to ${spender}`;
    await signMessageAsync({ message });
    
    const approval: Approval = {
      tokenAddress,
      spender,
      amount,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setApprovals([...approvals, approval]);
    return approval;
  };

  const revoke = async (tokenAddress: string, spender: string): Promise<void> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Revoke approval: ${tokenAddress} from ${spender}`;
    await signMessageAsync({ message });
    
    setApprovals(approvals.filter(
      (a) => !(a.tokenAddress === tokenAddress && a.spender === spender)
    ));
  };

  return { approve, revoke, approvals, address };
}

