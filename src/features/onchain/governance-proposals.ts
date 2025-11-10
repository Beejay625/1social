'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface GovernanceProposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  votes: number;
}

export function useGovernanceProposals() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [proposals, setProposals] = useState<GovernanceProposal[]>([]);

  const createProposal = async (title: string, description: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Proposal: ${title}`;
    await signMessageAsync({ message });
    
    const proposal: GovernanceProposal = {
      id: `prop_${Date.now()}`,
      title,
      description,
      proposer: address,
      votes: 0,
    };
    
    setProposals([...proposals, proposal]);
    return proposal;
  };

  return { createProposal, proposals, address };
}

