'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentCache {
  cacheId: string;
  contentHash: string;
  cacheKey: string;
  ttl: bigint;
  creator: string;
  timestamp: bigint;
}

export function useOnchainContentCacheManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);
  const [caches, setCaches] = useState<ContentCache[]>([]);

  const { data: cacheData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getCaches',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const setCache = async (contentHash: string, cacheKey: string, ttl: bigint) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Set cache onchain: ${cacheKey}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'setCache',
        args: [contentHash, cacheKey, ttl, address],
      });
    } finally {
      setManaging(false);
    }
  };

  useEffect(() => {
    if (cacheData) {
      const cache = cacheData as ContentCache;
      setCaches(prev => {
        const filtered = prev.filter(c => c.cacheId !== cache.cacheId);
        return [...filtered, cache];
      });
    }
  }, [cacheData]);

  return {
    setCache,
    managing,
    caches,
    address,
    isConnected,
    cacheData,
  };
}

