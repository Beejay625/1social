'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface CircuitBreaker {
  contract: string;
  threshold: bigint;
  tripped: boolean;
  wallet: string;
  timestamp: number;
}

export function useContractCircuitBreaker() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [breakers, setBreakers] = useState<CircuitBreaker[]>([]);

  const setCircuitBreaker = async (contract: string, threshold: bigint, tripped: boolean) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Set Circuit Breaker: ${contract} threshold ${threshold}`;
    await signMessageAsync({ message });
    
    const breaker: CircuitBreaker = {
      contract,
      threshold,
      tripped,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setBreakers([...breakers, breaker]);
    return breaker;
  };

  return { setCircuitBreaker, breakers, address };
}

