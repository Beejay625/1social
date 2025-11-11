'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ContentVote {
  id: string;
  postId: string;
  voter: string;
  vote: 'upvote' | 'downvote';
  weight: number;
  timestamp: number;
}

export function useSocialContentVoting() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [votes, setVotes] = useState<ContentVote[]>([]);

  const voteOnContent = async (postId: string, vote: 'upvote' | 'downvote', weight: number = 1) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Vote: ${vote} on ${postId} with weight ${weight}`;
    await signMessageAsync({ message });
    
    const contentVote: ContentVote = {
      id: `vote-${Date.now()}`,
      postId,
      voter: address,
      vote,
      weight,
      timestamp: Date.now(),
    };
    
    setVotes([...votes.filter(v => v.postId !== postId || v.voter !== address), contentVote]);
    return contentVote;
  };

  return { voteOnContent, votes, address };
}

