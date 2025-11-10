'use client';

import { useAccount, useWatchContractEvent } from 'wagmi';
import { useState } from 'react';

export interface VotingPower {
  delegate: string;
  previousBalance: bigint;
  newBalance: bigint;
  timestamp: number;
}

export function useVotingPowerTracker() {
  const { address } = useAccount();
  const [powers, setPowers] = useState<VotingPower[]>([]);

  useWatchContractEvent({
    address: '0x' as `0x${string}`,
    abi: [],
    eventName: 'DelegateVotesChanged',
    onLogs(logs) {
      const power: VotingPower = {
        delegate: logs[0]?.args?.delegate || '',
        previousBalance: logs[0]?.args?.previousBalance || BigInt(0),
        newBalance: logs[0]?.args?.newBalance || BigInt(0),
        timestamp: Date.now(),
      };
      setPowers([...powers, power]);
    },
  });

  return { powers, address };
}

