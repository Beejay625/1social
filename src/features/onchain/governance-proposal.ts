'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Proposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  votesFor: number;
  votesAgainst: number;
}

export function useGovernanceProposal() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [proposals, setProposals] = useState<Proposal[]>([]);

  const createProposal = async (title: string, description: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Proposal: ${title}`;
    await signMessageAsync({ message });
    
    const proposal: Proposal = {
      id: `prop_${Date.now()}`,
      title,
      description,
      proposer: address,
      votesFor: 0,
      votesAgainst: 0,
    };
    
    setProposals([...proposals, proposal]);
    return proposal;
  };

  return { createProposal, proposals, address };
}
