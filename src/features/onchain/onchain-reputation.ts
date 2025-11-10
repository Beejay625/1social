'use client';

import { useAccount } from 'wagmi';
import { useState } from 'react';

export interface ReputationScore {
  wallet: string;
  score: number;
  factors: string[];
}

export function useOnchainReputation() {
  const { address } = useAccount();
  const [reputation, setReputation] = useState<ReputationScore | null>(null);

  const calculateReputation = async () => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const score: ReputationScore = {
      wallet: address,
      score: Math.floor(Math.random() * 100),
      factors: ['age', 'activity', 'holdings'],
    };
    
    setReputation(score);
    return score;
  };

  return { calculateReputation, reputation, address };
}

