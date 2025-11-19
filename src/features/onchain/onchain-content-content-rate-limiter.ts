'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentRateLimit {
  limitId: string;
  action: string;
  maxRequests: bigint;
  window: bigint;
  creator: string;
  timestamp: bigint;
}

export function useOnchainContentRateLimiter() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);
  const [limits, setLimits] = useState<ContentRateLimit[]>([]);

  const { data: limitData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getRateLimits',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const setRateLimit = async (action: string, maxRequests: bigint, window: bigint) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Set rate limit onchain: ${action}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'setRateLimit',
        args: [action, maxRequests, window, address],
      });
    } finally {
      setManaging(false);
    }
  };

  useEffect(() => {
    if (limitData) {
      const limit = limitData as ContentRateLimit;
      setLimits(prev => {
        const filtered = prev.filter(l => l.limitId !== limit.limitId);
        return [...filtered, limit];
      });
    }
  }, [limitData]);

  return {
    setRateLimit,
    managing,
    limits,
    address,
    isConnected,
    limitData,
  };
}

