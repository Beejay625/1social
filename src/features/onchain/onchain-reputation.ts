'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ReputationScore {
  wallet: string;
  score: number;
  category: string;
  verified: boolean;
  timestamp: number;
}

export function useOnchainReputation() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [scores, setScores] = useState<ReputationScore[]>([]);

  const updateReputation = async (score: number, category: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Update Reputation: ${score} in ${category}`;
    await signMessageAsync({ message });
    
    const reputation: ReputationScore = {
      wallet: address,
      score,
      category,
      verified: true,
      timestamp: Date.now(),
    };
    
    setScores([...scores, reputation]);
    return reputation;
  };

  return { updateReputation, scores, address };
}
