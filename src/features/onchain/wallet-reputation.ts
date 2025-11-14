'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState } from 'react';

export interface ReputationScore {
  wallet: string;
  score: number;
  factors: {
    age: number;
    transactions: number;
    holdings: number;
  };
}

export function useWalletReputation() {
  const { address } = useAccount();
  const [reputation, setReputation] = useState<ReputationScore | null>(null);

  const calculateReputation = async (targetAddress?: string) => {
    const wallet = targetAddress || address;
    if (!wallet) return null;
    
    // Calculate reputation based on onchain activity
    const score: ReputationScore = {
      wallet,
      score: 75, // Mock score
      factors: {
        age: 365,
        transactions: 150,
        holdings: 5,
      },
    };
    
    setReputation(score);
    return score;
  };

  return { calculateReputation, reputation };
}


