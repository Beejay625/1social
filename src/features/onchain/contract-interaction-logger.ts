'use client';

/**
 * Contract Interaction Logger
 * Logs and tracks all contract interactions using Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface InteractionLog {
  contractAddress: string;
  functionName: string;
  args: any[];
  txHash: string;
  timestamp: number;
  status: 'pending' | 'success' | 'failed';
}

export function useContractInteractionLogger() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [logs, setLogs] = useState<InteractionLog[]>([]);

  const logInteraction = async (
    contractAddress: string,
    functionName: string,
    args: any[],
    txHash: string
  ): Promise<InteractionLog> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Log contract interaction: ${contractAddress} ${functionName}`;
    await signMessageAsync({ message });
    
    const log: InteractionLog = {
      contractAddress,
      functionName,
      args,
      txHash,
      timestamp: Date.now(),
      status: 'success',
    };
    
    setLogs([...logs, log]);
    return log;
  };

  return { logInteraction, logs, address };
}
