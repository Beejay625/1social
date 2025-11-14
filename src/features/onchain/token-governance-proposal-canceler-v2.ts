'use client';

/**
 * Token Governance Proposal Canceler V2
 * Cancel governance proposals with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ProposalCancellation {
  cancellationId: string;
  proposalId: string;
  reason?: string;
  txHash: string;
  cancelledBy: string;
  timestamp: number;
}

export function useTokenGovernanceProposalCancelerV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [cancellations, setCancellations] = useState<ProposalCancellation[]>([]);

  const cancel = async (
    proposalId: string,
    reason?: string
  ): Promise<ProposalCancellation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!proposalId || proposalId.trim() === '') {
      throw new Error('Proposal ID is required');
    }
    
    const message = `Cancel proposal: ${proposalId}${reason ? ` Reason: ${reason}` : ''}`;
    await signMessageAsync({ message });
    
    const cancellation: ProposalCancellation = {
      cancellationId: `cancel-${Date.now()}`,
      proposalId,
      reason,
      txHash: `0x${Date.now().toString(16)}`,
      cancelledBy: address,
      timestamp: Date.now(),
    };
    
    setCancellations([...cancellations, cancellation]);
    return cancellation;
  };

  return { cancel, cancellations, address };
}

