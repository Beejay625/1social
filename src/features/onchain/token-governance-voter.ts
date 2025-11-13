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
  support: boolean;
  weight: string;
  reason?: string;
  txHash: string;
  timestamp: number;
}

export function useTokenGovernanceVoter() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [votes, setVotes] = useState<Vote[]>([]);

  const vote = async (
    proposalId: string,
    support: boolean,
    weight: string,
    reason?: string
  ): Promise<Vote> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!proposalId || proposalId.trim() === '') {
      throw new Error('Proposal ID is required');
    }
    if (parseFloat(weight) <= 0) {
      throw new Error('Vote weight must be greater than zero');
    }
    
    const message = `Vote: ${proposalId} ${support ? 'FOR' : 'AGAINST'} with ${weight} weight`;
    await signMessageAsync({ message });
    
    const vote: Vote = {
      voteId: `vote-${Date.now()}`,
      proposalId,
      support,
      weight,
      reason,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setVotes([...votes, vote]);
    return vote;
  };

  return { vote, votes, address };
}

