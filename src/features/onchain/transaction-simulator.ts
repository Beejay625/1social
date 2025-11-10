'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SimulationResult {
  success: boolean;
  gasUsed: bigint;
  returnData: string;
  wallet: string;
  timestamp: number;
}

export function useTransactionSimulator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [results, setResults] = useState<SimulationResult[]>([]);

  const simulateTransaction = async (to: string, data: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Simulate: ${to} ${data.substring(0, 20)}`;
    await signMessageAsync({ message });
    
    const result: SimulationResult = {
      success: true,
      gasUsed: BigInt(21000),
      returnData: '0x',
      wallet: address,
      timestamp: Date.now(),
    };
    
    setResults([...results, result]);
    return result;
  };

  return { simulateTransaction, results, address };
}

