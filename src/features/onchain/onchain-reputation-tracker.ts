'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ReputationScore {
  wallet: string;
  score: number;
  factors: {
    contentQuality: number;
    engagement: number;
    consistency: number;
  };
}

export function useOnchainReputationTracker() {
  const { address, isConnected } = useAccount();
  const [reputation, setReputation] = useState<ReputationScore | null>(null);

  const { data: score } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getReputation',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  useEffect(() => {
    if (address && score) {
      setReputation({
        wallet: address,
        score: Number(score) || 0,
        factors: {
          contentQuality: 0,
          engagement: 0,
          consistency: 0,
        },
      });
    }
  }, [address, score]);

  return { reputation, isConnected, address };
}

