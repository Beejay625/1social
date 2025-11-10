'use client';

import { useAccount, useWatchContractEvent } from 'wagmi';
import { useState } from 'react';

export interface VoteCast {
  voter: string;
  proposalId: bigint;
  support: boolean;
  weight: bigint;
  timestamp: number;
}

export function useVoteCastTracker() {
  const { address } = useAccount();
  const [votes, setVotes] = useState<VoteCast[]>([]);

  useWatchContractEvent({
    address: '0x' as `0x${string}`,
    abi: [],
    eventName: 'VoteCast',
    onLogs(logs) {
      const vote: VoteCast = {
        voter: logs[0]?.args?.voter || '',
        proposalId: logs[0]?.args?.proposalId || BigInt(0),
        support: logs[0]?.args?.support || false,
        weight: logs[0]?.args?.weight || BigInt(0),
        timestamp: Date.now(),
      };
      setVotes([...votes, vote]);
    },
  });

  return { votes, address };
}

