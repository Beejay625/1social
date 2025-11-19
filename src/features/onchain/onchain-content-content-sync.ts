'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentSync {
  syncId: string;
  contentHash: string;
  targetProtocol: string;
  status: 'pending' | 'synced' | 'failed';
  syncer: string;
  timestamp: bigint;
}

export function useOnchainContentSync() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [syncing, setSyncing] = useState(false);
  const [syncs, setSyncs] = useState<ContentSync[]>([]);

  const { data: syncData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getSyncs',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const syncContent = async (contentHash: string, targetProtocol: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setSyncing(true);

    try {
      const message = `Sync content onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'syncContent',
        args: [contentHash, targetProtocol, address],
      });
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    if (syncData) {
      const sync = syncData as ContentSync;
      setSyncs(prev => {
        const filtered = prev.filter(s => s.syncId !== sync.syncId);
        return [...filtered, sync];
      });
    }
  }, [syncData]);

  return {
    syncContent,
    syncing,
    syncs,
    address,
    isConnected,
    syncData,
  };
}

