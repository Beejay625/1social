'use client';

import { useAccount, useBlockNumber } from 'wagmi';
import { useState, useEffect } from 'react';

export interface BlockInfo {
  number: bigint;
  timestamp: number;
  chainId: number;
}

export function useBlockNumberTracker() {
  const { address, chainId } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const [blockInfo, setBlockInfo] = useState<BlockInfo | null>(null);

  useEffect(() => {
    if (blockNumber !== undefined && chainId) {
      setBlockInfo({
        number: blockNumber,
        timestamp: Date.now(),
        chainId,
      });
    }
  }, [blockNumber, chainId]);

  return { blockInfo, address, chainId };
}

