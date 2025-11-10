'use client';

import { useAccount, useWatchContractEvent } from 'wagmi';
import { useState } from 'react';

export interface RewardClaim {
  claimer: string;
  amount: bigint;
  token: string;
  timestamp: number;
}

export function useRewardClaimTracker() {
  const { address } = useAccount();
  const [claims, setClaims] = useState<RewardClaim[]>([]);

  useWatchContractEvent({
    address: '0x' as `0x${string}`,
    abi: [],
    eventName: 'RewardClaimed',
    onLogs(logs) {
      const claim: RewardClaim = {
        claimer: logs[0]?.args?.user || '',
        amount: logs[0]?.args?.amount || BigInt(0),
        token: '0x',
        timestamp: Date.now(),
      };
      setClaims([...claims, claim]);
    },
  });

  return { claims, address };
}

