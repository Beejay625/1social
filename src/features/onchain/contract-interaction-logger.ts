'use client';

/**
 * Contract Interaction Logger
 * Log and track all contract interactions with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface InteractionLog {
  logId: string;
  contractAddress: string;
  functionName: string;
  parameters: Record<string, string>;
  loggedBy: string;
  timestamp: number;
}

export function useContractInteractionLogger() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [logs, setLogs] = useState<InteractionLog[]>([]);

  const logInteraction = async (
    contractAddress: string,
    functionName: string,
    parameters: Record<string, string>
  ): Promise<InteractionLog> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!contractAddress.startsWith('0x')) {
      throw new Error('Invalid contract address format');
    }
    
    const message = `Log interaction: ${contractAddress} function ${functionName}`;
    await signMessageAsync({ message });
    
    const log: InteractionLog = {
      logId: `log-${Date.now()}`,
      contractAddress,
      functionName,
      parameters,
      loggedBy: address,
      timestamp: Date.now(),
    };
    
    setLogs([...logs, log]);
    return log;
  };

  return { logInteraction, logs, address };
}
