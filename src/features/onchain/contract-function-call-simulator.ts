'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface FunctionCall {
  contract: string;
  function: string;
  args: any[];
  result: any;
  wallet: string;
  timestamp: number;
}

export function useContractFunctionCallSimulator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [calls, setCalls] = useState<FunctionCall[]>([]);

  const simulateCall = async (contract: string, func: string, args: any[], result: any) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Simulate Call: ${contract}.${func}`;
    await signMessageAsync({ message });
    
    const call: FunctionCall = {
      contract,
      function: func,
      args,
      result,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setCalls([...calls, call]);
    return call;
  };

  return { simulateCall, calls, address };
}
