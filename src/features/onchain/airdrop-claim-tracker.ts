'use client';

import { useAccount, useWatchContractEvent } from 'wagmi';
import { useState } from 'react';

export interface AirdropClaim {
  claimer: string;
  amount: bigint;
  token: string;
  timestamp: number;
}

export function useAirdropClaimTracker() {
  const { address } = useAccount();
  const [claims, setClaims] = useState<AirdropClaim[]>([]);

  useWatchContractEvent({
    address: '0x' as `0x${string}`,
    abi: [],
    eventName: 'AirdropClaimed',
    onLogs(logs) {
      const claim: AirdropClaim = {
        claimer: logs[0]?.args?.claimer || '',
        amount: logs[0]?.args?.amount || BigInt(0),
        token: '0x',
        timestamp: Date.now(),
      };
      setClaims([...claims, claim]);
    },
  });

  return { claims, address };
}


