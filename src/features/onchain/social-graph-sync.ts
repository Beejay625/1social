'use client';

import { useAccount } from 'wagmi';
import { useState } from 'react';

export interface GraphSync {
  protocol: string;
  synced: boolean;
  lastSync: number;
}

export function useSocialGraphSync() {
  const { address } = useAccount();
  const [syncs, setSyncs] = useState<GraphSync[]>([]);

  const syncGraph = async (protocol: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const sync: GraphSync = {
      protocol,
      synced: true,
      lastSync: Date.now(),
    };
    
    setSyncs([...syncs, sync]);
    return sync;
  };

  return { syncGraph, syncs, address };
}
