'use client';

/**
 * Token Holder Snapshot
 * Create snapshots of token holders with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface HolderSnapshot {
  snapshotId: string;
  tokenAddress: string;
  blockNumber: number;
  holders: Array<{
    address: string;
    balance: string;
  }>;
  totalHolders: number;
  createdBy: string;
  timestamp: number;
}

export function useTokenHolderSnapshot() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [snapshots, setSnapshots] = useState<HolderSnapshot[]>([]);

  const createSnapshot = async (
    tokenAddress: string,
    blockNumber: number
  ): Promise<HolderSnapshot> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    if (blockNumber <= 0) {
      throw new Error('Block number must be greater than zero');
    }
    
    const message = `Create snapshot: ${tokenAddress} at block ${blockNumber}`;
    await signMessageAsync({ message });
    
    const snapshot: HolderSnapshot = {
      snapshotId: `snapshot-${Date.now()}`,
      tokenAddress,
      blockNumber,
      holders: [],
      totalHolders: 0,
      createdBy: address,
      timestamp: Date.now(),
    };
    
    setSnapshots([...snapshots, snapshot]);
    return snapshot;
  };

  return { createSnapshot, snapshots, address };
}
