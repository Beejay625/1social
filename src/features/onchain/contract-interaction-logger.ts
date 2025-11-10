'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface InteractionLog {
  contract: string;
  function: string;
  args: any[];
  result: any;
  wallet: string;
  timestamp: number;
}

export function useContractInteractionLogger() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [logs, setLogs] = useState<InteractionLog[]>([]);

  const logInteraction = async (contract: string, func: string, args: any[], result: any) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Log: ${contract}.${func}(${args.join(', ')})`;
    await signMessageAsync({ message });
    
    const log: InteractionLog = {
      contract,
      function: func,
      args,
      result,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setLogs([...logs, log]);
    return log;
  };

  return { logInteraction, logs, address };
}

