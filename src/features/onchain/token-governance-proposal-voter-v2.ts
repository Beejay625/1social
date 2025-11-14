'use client';

/**
 * Token Governance Proposal Voter V2
 * Vote on governance proposals with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface Vote {
  voteId: string;
  proposalId: string;
  voteType: 'for' | 'against' | 'abstain';
  votingPower: string;
  votedBy: string;
  timestamp: number;
}

export function useTokenGovernanceProposalVoterV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [votes, setVotes] = useState<Vote[]>([]);

  const vote = async (
    proposalId: string,
    voteType: 'for' | 'against' | 'abstain',
    votingPower: string
  ): Promise<Vote> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!proposalId || proposalId.trim() === '') {
      throw new Error('Proposal ID is required');
    }
    
    const message = `Vote on proposal V2: ${proposalId} ${voteType} with ${votingPower} power`;
    await signMessageAsync({ message });
    
    const voteRecord: Vote = {
      voteId: `vote-v2-${Date.now()}`,
      proposalId,
      voteType,
      votingPower,
      votedBy: address,
      timestamp: Date.now(),
    };
    
    setVotes([...votes, voteRecord]);
    return voteRecord;
  };

  return { vote, votes, address };
}

