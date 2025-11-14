'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface CurationVote {
  id: string;
  contentId: string;
  voter: string;
  vote: 'curate' | 'reject';
  weight: number;
  timestamp: number;
}

export function useSocialContentCurationVoting() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [votes, setVotes] = useState<CurationVote[]>([]);

  const voteOnCuration = async (
    contentId: string,
    vote: 'curate' | 'reject',
    weight: number = 1
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Vote on Curation: ${contentId} ${vote} weight ${weight}`;
    await signMessageAsync({ message });
    
    const curationVote: CurationVote = {
      id: `curation-vote-${Date.now()}`,
      contentId,
      voter: address,
      vote,
      weight,
      timestamp: Date.now(),
    };
    
    setVotes([...votes.filter(v => v.contentId !== contentId || v.voter !== address), curationVote]);
    return curationVote;
  };

  return { voteOnCuration, votes, address };
}


