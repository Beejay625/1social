'use client';

import { useAccount, useBlockNumber } from 'wagmi';
import { useState, useEffect } from 'react';

export interface Timestamp {
  block: number;
  timestamp: number;
  chainId: number;
  timestamp2: number;
}

export function useContractTimestampTracker() {
  const { address, chainId } = useAccount();
  const { data: blockNumber } = useBlockNumber();
  const [timestamps, setTimestamps] = useState<Timestamp[]>([]);

  useEffect(() => {
    if (address && blockNumber) {
      const timestamp: Timestamp = {
        block: Number(blockNumber),
        timestamp: Date.now(),
        chainId: chainId || 1,
        timestamp2: Date.now(),
      };
      setTimestamps([timestamp]);
    }
  }, [address, blockNumber, chainId]);

  return { timestamps, address, chainId };
}

