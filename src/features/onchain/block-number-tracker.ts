'use client';

import { useAccount, useBlockNumber } from 'wagmi';
import { useState, useEffect } from 'react';

export interface BlockData {
  blockNumber: bigint;
  timestamp: number;
  chainId: number;
}

export function useBlockNumberTracker() {
  const { address } = useAccount();
  const { data: blockNumber } = useBlockNumber();
  const [blocks, setBlocks] = useState<BlockData[]>([]);

  useEffect(() => {
    if (!address || !blockNumber) return;
    
    const blockData: BlockData = {
      blockNumber,
      timestamp: Date.now(),
      chainId: 1,
    };
    
    setBlocks([blockData]);
  }, [address, blockNumber]);

  return { blocks, address };
}
