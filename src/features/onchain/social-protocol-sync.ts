'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ProtocolSync {
  id: string;
  fromProtocol: string;
  toProtocol: string;
  contentId: string;
  status: 'pending' | 'synced' | 'failed';
  timestamp: number;
}

export function useSocialProtocolSync() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [syncs, setSyncs] = useState<ProtocolSync[]>([]);

  const syncContent = async (fromProtocol: string, toProtocol: string, contentId: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Sync Content: ${contentId} from ${fromProtocol} to ${toProtocol}`;
    await signMessageAsync({ message });
    
    const sync: ProtocolSync = {
      id: `sync-${Date.now()}`,
      fromProtocol,
      toProtocol,
      contentId,
      status: 'synced',
      timestamp: Date.now(),
    };
    
    setSyncs([...syncs, sync]);
    return sync;
  };

  return { syncContent, syncs, address };
}

