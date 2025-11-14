'use client';

/**
 * Token Governance Proposal Canceler V2
 * Cancel governance proposals with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface Cancellation {
  cancellationId: string;
  proposalId: string;
  reason?: string;
  canceledBy: string;
  timestamp: number;
}

export function useTokenGovernanceProposalCancelerV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [cancellations, setCancellations] = useState<Cancellation[]>([]);

  const cancelProposal = async (
    proposalId: string,
    reason?: string
  ): Promise<Cancellation> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Cancel proposal: ${proposalId}${reason ? ` reason: ${reason}` : ''}`;
    await signMessageAsync({ message });
    
    const cancellation: Cancellation = {
      cancellationId: `cancel-${Date.now()}`,
      proposalId,
      reason,
      canceledBy: address,
      timestamp: Date.now(),
    };
    
    setCancellations([...cancellations, cancellation]);
    return cancellation;
  };

  return { cancelProposal, cancellations, address };
}
