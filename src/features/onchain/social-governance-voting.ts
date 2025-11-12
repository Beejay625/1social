'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface GovernanceVote {
  id: string;
  proposalId: string;
  voter: string;
  vote: 'for' | 'against' | 'abstain';
  weight: string;
  timestamp: number;
}

export function useSocialGovernanceVoting() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [votes, setVotes] = useState<GovernanceVote[]>([]);

  const castVote = async (
    proposalId: string,
    vote: 'for' | 'against' | 'abstain',
    weight: string
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Cast Vote: ${proposalId} ${vote} weight ${weight}`;
    await signMessageAsync({ message });
    
    const governanceVote: GovernanceVote = {
      id: `vote-${Date.now()}`,
      proposalId,
      voter: address,
      vote,
      weight,
      timestamp: Date.now(),
    };
    
    setVotes([...votes.filter(v => v.proposalId !== proposalId || v.voter !== address), governanceVote]);
    return governanceVote;
  };

  return { castVote, votes, address };
}

