'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface StateSnapshot {
  contract: string;
  block: number;
  state: Record<string, any>;
  wallet: string;
  timestamp: number;
}

export function useContractStateSnapshot() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [snapshots, setSnapshots] = useState<StateSnapshot[]>([]);

  const createSnapshot = async (contract: string, block: number, state: Record<string, any>) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Create Snapshot: ${contract} at block ${block}`;
    await signMessageAsync({ message });
    
    const snapshot: StateSnapshot = {
      contract,
      block,
      state,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setSnapshots([...snapshots, snapshot]);
    return snapshot;
  };

  return { createSnapshot, snapshots, address };
}

