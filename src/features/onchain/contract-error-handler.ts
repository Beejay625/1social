'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ErrorHandling {
  contract: string;
  error: string;
  handled: boolean;
  wallet: string;
  timestamp: number;
}

export function useContractErrorHandler() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [handlers, setHandlers] = useState<ErrorHandling[]>([]);

  const handleError = async (contract: string, error: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Handle Error: ${contract} - ${error}`;
    await signMessageAsync({ message });
    
    const handler: ErrorHandling = {
      contract,
      error,
      handled: true,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setHandlers([...handlers, handler]);
    return handler;
  };

  return { handleError, handlers, address };
}

