'use client';

import { useAccount, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface InteractionLog {
  contractAddress: string;
  functionName: string;
  args: unknown[];
  timestamp: number;
  txHash?: string;
}

export function useContractInteractionLoggerV2() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [logs, setLogs] = useState<InteractionLog[]>([]);

  const log = async (logEntry: InteractionLog) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');

    const message = `Log interaction: ${logEntry.functionName} on ${logEntry.contractAddress}`;
    await signMessageAsync({ message });

    const entry: InteractionLog = {
      ...logEntry,
      timestamp: Date.now(),
    };

    setLogs(prev => [...prev, entry]);
    return entry;
  };

  const getLogs = (contractAddress?: string) => {
    if (contractAddress) {
      return logs.filter(log => log.contractAddress.toLowerCase() === contractAddress.toLowerCase());
    }
    return logs;
  };

  return {
    log,
    getLogs,
    logs,
    address,
    isConnected,
  };
}

