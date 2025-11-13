'use client';

/**
 * Token Governance Proposal Canceler
 * Cancel governance proposals with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ProposalCancellation {
  cancellationId: string;
  proposalId: string;
  reason: string;
  canceledBy: string;
  timestamp: number;
}

export function useTokenGovernanceProposalCanceler() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [cancellations, setCancellations] = useState<ProposalCancellation[]>([]);

  const cancelProposal = async (
    proposalId: string,
    reason: string
  ): Promise<ProposalCancellation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!proposalId || proposalId.trim() === '') {
      throw new Error('Proposal ID is required');
    }
    
    const message = `Cancel proposal: ${proposalId} - ${reason}`;
    await signMessageAsync({ message });
    
    const cancellation: ProposalCancellation = {
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
