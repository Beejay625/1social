'use client';

import { useAccount, useWatchContractEvent } from 'wagmi';
import { useState } from 'react';

export interface TokenBurn {
  from: string;
  amount: bigint;
  token: string;
  timestamp: number;
}

export function useTokenBurnTracker() {
  const { address } = useAccount();
  const [burns, setBurns] = useState<TokenBurn[]>([]);

  useWatchContractEvent({
    address: '0x' as `0x${string}`,
    abi: [],
    eventName: 'Transfer',
    onLogs(logs) {
      if (logs[0]?.args?.to === '0x0000000000000000000000000000000000000000') {
        const burn: TokenBurn = {
          from: logs[0]?.args?.from || '',
          amount: logs[0]?.args?.value || BigInt(0),
          token: '0x',
          timestamp: Date.now(),
        };
        setBurns([...burns, burn]);
      }
    },
  });

  return { burns, address };
}
