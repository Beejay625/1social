'use client';

/**
 * Token Approval Manager
 * Manage token approvals and revocations with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface Approval {
  approvalId: string;
  tokenAddress: string;
  spender: string;
  amount: string;
  approved: boolean;
  managedBy: string;
  timestamp: number;
}

export function useTokenApprovalManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [approvals, setApprovals] = useState<Approval[]>([]);

  const manageApproval = async (
    tokenAddress: string,
    spender: string,
    amount: string,
    approved: boolean
  ): Promise<Approval> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x') || !spender.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    
    const message = `${approved ? 'Approve' : 'Revoke'} token: ${tokenAddress} to ${spender} amount ${amount}`;
    await signMessageAsync({ message });
    
    const approval: Approval = {
      approvalId: `approval-${Date.now()}`,
      tokenAddress,
      spender,
      amount,
      approved,
      managedBy: address,
      timestamp: Date.now(),
    };
    
    setApprovals([...approvals, approval]);
    return approval;
  };

  return { manageApproval, approvals, address };
}
