'use client';

import { useAccount } from 'wagmi';
import { useState } from 'react';

export interface ReputationData {
  wallet: string;
  score: number;
  factors: string[];
  updatedAt: number;
}

export function useOnchainReputationTracker() {
  const { address } = useAccount();
  const [reputation, setReputation] = useState<ReputationData | null>(null);

  const updateReputation = async () => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const data: ReputationData = {
      wallet: address,
      score: 85,
      factors: ['age', 'activity', 'holdings'],
      updatedAt: Date.now(),
    };
    
    setReputation(data);
    return data;
  };

  return { updateReputation, reputation, address };
}
