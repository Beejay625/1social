'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface DebugInfo {
  contract: string;
  function: string;
  step: number;
  state: Record<string, any>;
  wallet: string;
  timestamp: number;
}

export function useContractDebugger() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [debugs, setDebugs] = useState<DebugInfo[]>([]);

  const debugContract = async (contract: string, func: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Debug: ${contract}.${func}`;
    await signMessageAsync({ message });
    
    const debug: DebugInfo = {
      contract,
      function: func,
      step: 0,
      state: {},
      wallet: address,
      timestamp: Date.now(),
    };
    
    setDebugs([...debugs, debug]);
    return debug;
  };

  return { debugContract, debugs, address };
}

