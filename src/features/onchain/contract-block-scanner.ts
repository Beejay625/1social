'use client';

import { useAccount, useBlockNumber } from 'wagmi';
import { useState, useEffect } from 'react';

export interface BlockScan {
  block: number;
  transactions: number;
  timestamp: number;
  chainId: number;
}

export function useContractBlockScanner() {
  const { address, chainId } = useAccount();
  const { data: blockNumber } = useBlockNumber();
  const [scans, setScans] = useState<BlockScan[]>([]);

  useEffect(() => {
    if (address && blockNumber) {
      const scan: BlockScan = {
        block: Number(blockNumber),
        transactions: 0,
        timestamp: Date.now(),
        chainId: chainId || 1,
      };
      setScans([scan]);
    }
  }, [address, blockNumber, chainId]);

  return { scans, address, chainId };
}

