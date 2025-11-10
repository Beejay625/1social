'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface Reputation {
  wallet: string;
  score: number;
  factors: {
    content: number;
    engagement: number;
    consistency: number;
  };
}

export function useReputationSystem() {
  const { address } = useAccount();
  const [reputation, setReputation] = useState<Reputation | null>(null);

  const { data: repData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getReputation',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (address && repData) {
      const rep: Reputation = {
        wallet: address,
        score: Number(repData) || 0,
        factors: {
          content: 0,
          engagement: 0,
          consistency: 0,
        },
      };
      setReputation(rep);
    }
  }, [address, repData]);

  return { reputation, address };
}
