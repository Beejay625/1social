'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface CallTrace {
  contract: string;
  function: string;
  depth: number;
  wallet: string;
  timestamp: number;
}

export function useContractCallTracer() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [traces, setTraces] = useState<CallTrace[]>([]);

  const traceCall = async (contract: string, func: string, depth: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Trace Call: ${contract}.${func}`;
    await signMessageAsync({ message });
    
    const trace: CallTrace = {
      contract,
      function: func,
      depth,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setTraces([...traces, trace]);
    return trace;
  };

  return { traceCall, traces, address };
}


