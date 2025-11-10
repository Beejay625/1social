'use client';

import { useAccount, useBlockNumber } from 'wagmi';
import { useState, useEffect } from 'react';

export interface BlockData {
  blockNumber: number;
  timestamp: number;
  chain: string;
}

export function useBlockNumberTracker() {
  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber();
  const [blocks, setBlocks] = useState<BlockData[]>([]);

  useEffect(() => {
    if (!address || !blockNumber) return;
    
    const block: BlockData = {
      blockNumber: Number(blockNumber),
      timestamp: Date.now(),
      chain: 'ethereum',
    };
    
    setBlocks([block]);
  }, [address, blockNumber]);

  return { blocks, address, blockNumber };
}
