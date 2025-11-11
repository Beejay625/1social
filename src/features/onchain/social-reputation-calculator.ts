'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ReputationScore {
  address: string;
  score: number;
  factors: {
    posts: number;
    engagement: number;
    followers: number;
    tips: number;
  };
  updatedAt: number;
}

export function useSocialReputationCalculator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [reputation, setReputation] = useState<ReputationScore | null>(null);

  const calculateReputation = async (posts: number, engagement: number, followers: number, tips: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Calculate Reputation: posts=${posts}, engagement=${engagement}, followers=${followers}, tips=${tips}`;
    await signMessageAsync({ message });
    
    const score = (posts * 10) + (engagement * 5) + (followers * 2) + (tips * 20);
    
    const reputationScore: ReputationScore = {
      address,
      score,
      factors: { posts, engagement, followers, tips },
      updatedAt: Date.now(),
    };
    
    setReputation(reputationScore);
    return reputationScore;
  };

  return { calculateReputation, reputation, address };
}

