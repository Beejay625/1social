'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface DAOVote {
  proposalId: string;
  vote: 'yes' | 'no' | 'abstain';
  weight: number;
  wallet: string;
}

export function useDAOVoting() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [votes, setVotes] = useState<DAOVote[]>([]);

  const castVote = async (proposalId: string, vote: 'yes' | 'no' | 'abstain') => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Vote: ${proposalId} ${vote}`;
    await signMessageAsync({ message });
    
    const voteRecord: DAOVote = {
      proposalId,
      vote,
      weight: 1,
      wallet: address,
    };
    
    setVotes([...votes, voteRecord]);
    return voteRecord;
  };

  return { castVote, votes, address };
}

