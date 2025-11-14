'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TokenSnapshot {
  id: string;
  creator: string;
  tokenAddress: string;
  blockNumber: number;
  holders: string[];
  balances: Record<string, string>;
  timestamp: number;
}

export function useSocialTokenSnapshot() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [snapshots, setSnapshots] = useState<TokenSnapshot[]>([]);

  const createSnapshot = async (
    tokenAddress: string,
    blockNumber: number,
    holders: string[],
    balances: Record<string, string>
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Create Snapshot: ${tokenAddress} block ${blockNumber} ${holders.length} holders`;
    await signMessageAsync({ message });
    
    const snapshot: TokenSnapshot = {
      id: `snapshot-${Date.now()}`,
      creator: address,
      tokenAddress,
      blockNumber,
      holders,
      balances,
      timestamp: Date.now(),
    };
    
    setSnapshots([...snapshots, snapshot]);
    return snapshot;
  };

  return { createSnapshot, snapshots, address };
}


