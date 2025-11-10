'use client';

import { useAccount, useWatchContractEvent } from 'wagmi';
import { useState } from 'react';

export interface Stake {
  staker: string;
  amount: bigint;
  token: string;
  timestamp: number;
}

export function useStakeTracker() {
  const { address } = useAccount();
  const [stakes, setStakes] = useState<Stake[]>([]);

  useWatchContractEvent({
    address: '0x' as `0x${string}`,
    abi: [],
    eventName: 'Staked',
    onLogs(logs) {
      const stake: Stake = {
        staker: logs[0]?.args?.user || '',
        amount: logs[0]?.args?.amount || BigInt(0),
        token: '0x',
        timestamp: Date.now(),
      };
      setStakes([...stakes, stake]);
    },
  });

  return { stakes, address };
}

