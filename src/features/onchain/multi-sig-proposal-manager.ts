'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ProposalManagement {
  id: string;
  proposalId: string;
  action: 'approve' | 'reject' | 'execute';
  signatures: string[];
  executed: boolean;
}

export function useMultiSigProposalManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [proposals, setProposals] = useState<ProposalManagement[]>([]);

  const manageProposal = async (proposalId: string, action: 'approve' | 'reject' | 'execute') => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Proposal ${action}: ${proposalId}`;
    const signature = await signMessageAsync({ message });

    const proposal: ProposalManagement = {
      id: signature,
      proposalId,
      action,
      signatures: [signature],
      executed: action === 'execute',
    };

    setProposals([...proposals, proposal]);
    return proposal;
  };

  return { manageProposal, proposals, address };
}
