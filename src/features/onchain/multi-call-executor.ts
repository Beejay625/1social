'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface MultiCall {
  calls: Array<{ target: string; data: string }>;
  results: any[];
  wallet: string;
  timestamp: number;
}

export function useMultiCallExecutor() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [calls, setCalls] = useState<MultiCall[]>([]);

  const executeMultiCall = async (callArray: Array<{ target: string; data: string }>) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `MultiCall: ${callArray.length} calls`;
    await signMessageAsync({ message });
    
    const multiCall: MultiCall = {
      calls: callArray,
      results: [],
      wallet: address,
      timestamp: Date.now(),
    };
    
    setCalls([...calls, multiCall]);
    return multiCall;
  };

  return { executeMultiCall, calls, address };
}


