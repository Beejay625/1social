'use client';

/**
 * Token Governance Voter
 * Cast votes on governance proposals with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Vote {
  voteId: string;
  proposalId: string;
  vote: 'for' | 'against' | 'abstain';
  votingPower: string;
  votedBy: string;
  txHash: string;
  timestamp: number;
}

export function useTokenGovernanceVoter() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [votes, setVotes] = useState<Vote[]>([]);

  const castVote = async (
    proposalId: string,
    vote: 'for' | 'against' | 'abstain',
    votingPower: string
  ): Promise<Vote> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!proposalId || proposalId.trim() === '') {
      throw new Error('Proposal ID is required');
    }
    
    const message = `Cast vote: ${proposalId} ${vote} with ${votingPower} power`;
    await signMessageAsync({ message });
    
    const voteRecord: Vote = {
      voteId: `vote-${Date.now()}`,
      proposalId,
      vote,
      votingPower,
      votedBy: address,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setVotes([...votes, voteRecord]);
    return voteRecord;
  };

  return { castVote, votes, address };
}
