'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TokenSnapshot {
  id: string;
  token: string;
  blockNumber: number;
  holders: string[];
  totalSupply: string;
  wallet: string;
}

export function useTokenSnapshot() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [snapshots, setSnapshots] = useState<TokenSnapshot[]>([]);

  const createSnapshot = async (token: string, blockNumber: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Snapshot: ${token} block ${blockNumber}`;
    await signMessageAsync({ message });
    
    const snapshot: TokenSnapshot = {
      id: `snapshot_${Date.now()}`,
      token,
      blockNumber,
      holders: [],
      totalSupply: '0',
      wallet: address,
    };
    
    setSnapshots([...snapshots, snapshot]);
    return snapshot;
  };

  return { createSnapshot, snapshots, address };
}

