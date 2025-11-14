'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface FunctionCall {
  contract: string;
  function: string;
  args: any[];
  calldata: string;
  wallet: string;
  timestamp: number;
}

export function useFunctionCallBuilder() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [calls, setCalls] = useState<FunctionCall[]>([]);

  const buildCall = async (contract: string, func: string, args: any[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Build Call: ${contract}.${func}(${args.join(', ')})`;
    await signMessageAsync({ message });
    
    const call: FunctionCall = {
      contract,
      function: func,
      args,
      calldata: `0x${Date.now().toString(16)}`,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setCalls([...calls, call]);
    return call;
  };

  return { buildCall, calls, address };
}


