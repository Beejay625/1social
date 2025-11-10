'use client';

import { useAccount, useWatchContractEvent } from 'wagmi';
import { useState } from 'react';

export interface Unstake {
  staker: string;
  amount: bigint;
  token: string;
  timestamp: number;
}

export function useUnstakeTracker() {
  const { address } = useAccount();
  const [unstakes, setUnstakes] = useState<Unstake[]>([]);

  useWatchContractEvent({
    address: '0x' as `0x${string}`,
    abi: [],
    eventName: 'Unstaked',
    onLogs(logs) {
      const unstake: Unstake = {
        staker: logs[0]?.args?.user || '',
        amount: logs[0]?.args?.amount || BigInt(0),
        token: '0x',
        timestamp: Date.now(),
      };
      setUnstakes([...unstakes, unstake]);
    },
  });

  return { unstakes, address };
}

