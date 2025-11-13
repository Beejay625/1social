'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RateLimit {
  contract: string;
  limit: number;
  window: number;
  current: number;
  wallet: string;
  timestamp: number;
}

export function useContractRateLimiter() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [rateLimits, setRateLimits] = useState<RateLimit[]>([]);

  const setRateLimit = async (contract: string, limit: number, window: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Set Rate Limit: ${limit} per ${window}s on ${contract}`;
    await signMessageAsync({ message });
    
    const rateLimit: RateLimit = {
      contract,
      limit,
      window,
      current: 0,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setRateLimits([...rateLimits, rateLimit]);
    return rateLimit;
  };

  return { setRateLimit, rateLimits, address };
}
