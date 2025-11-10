'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ParsedLog {
  address: string;
  topics: string[];
  data: string;
  decoded: Record<string, any>;
  wallet: string;
  timestamp: number;
}

export function useLogParser() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [logs, setLogs] = useState<ParsedLog[]>([]);

  const parseLog = async (address: string, topics: string[], data: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Parse Log: ${address}`;
    await signMessageAsync({ message });
    
    const log: ParsedLog = {
      address,
      topics,
      data,
      decoded: {},
      wallet: address,
      timestamp: Date.now(),
    };
    
    setLogs([...logs, log]);
    return log;
  };

  return { parseLog, logs, address };
}

