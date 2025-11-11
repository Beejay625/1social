'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface GovernanceProposal {
  id: string;
  proposer: string;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  status: 'active' | 'passed' | 'rejected';
  timestamp: number;
}

export function useSocialCommunityGovernance() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [proposals, setProposals] = useState<GovernanceProposal[]>([]);

  const createProposal = async (title: string, description: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Create Proposal: ${title}`;
    await signMessageAsync({ message });
    
    const proposal: GovernanceProposal = {
      id: `proposal-${Date.now()}`,
      proposer: address,
      title,
      description,
      votesFor: 0,
      votesAgainst: 0,
      status: 'active',
      timestamp: Date.now(),
    };
    
    setProposals([...proposals, proposal]);
    return proposal;
  };

  const voteOnProposal = async (proposalId: string, vote: 'for' | 'against') => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Vote: ${vote} on ${proposalId}`;
    await signMessageAsync({ message });
    
    setProposals(proposals.map(p => {
      if (p.id === proposalId) {
        return {
          ...p,
          votesFor: vote === 'for' ? p.votesFor + 1 : p.votesFor,
          votesAgainst: vote === 'against' ? p.votesAgainst + 1 : p.votesAgainst,
        };
      }
      return p;
    }));
  };

  return { createProposal, voteOnProposal, proposals, address };
}

