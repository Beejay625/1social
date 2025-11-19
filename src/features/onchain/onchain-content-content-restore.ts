'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentRestore {
  restoreId: string;
  backupId: string;
  restoredHash: string;
  restorer: string;
  timestamp: bigint;
}

export function useOnchainContentRestore() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [restoring, setRestoring] = useState(false);
  const [restores, setRestores] = useState<ContentRestore[]>([]);

  const { data: restoreData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getRestores',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const restoreContent = async (backupId: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setRestoring(true);

    try {
      const message = `Restore content onchain: ${backupId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'restoreContent',
        args: [backupId, address],
      });
    } finally {
      setRestoring(false);
    }
  };

  useEffect(() => {
    if (restoreData) {
      const restore = restoreData as ContentRestore;
      setRestores(prev => {
        const filtered = prev.filter(r => r.restoreId !== restore.restoreId);
        return [...filtered, restore];
      });
    }
  }, [restoreData]);

  return {
    restoreContent,
    restoring,
    restores,
    address,
    isConnected,
    restoreData,
  };
}

