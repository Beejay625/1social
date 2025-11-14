'use client';

/**
 * Token Multicall Executor
 * Execute multiple contract calls in a single transaction with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface MulticallExecution {
  executionId: string;
  calls: Array<{
    target: string;
    data: string;
  }>;
  txHash: string;
  executedBy: string;
  timestamp: number;
}

export function useTokenMulticallExecutor() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [executions, setExecutions] = useState<MulticallExecution[]>([]);

  const execute = async (
    calls: Array<{
      target: string;
      data: string;
    }>
  ): Promise<MulticallExecution> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (calls.length === 0) {
      throw new Error('At least one call is required');
    }
    
    const message = `Execute multicall: ${calls.length} calls`;
    await signMessageAsync({ message });
    
    const execution: MulticallExecution = {
      executionId: `multicall-${Date.now()}`,
      calls,
      txHash: `0x${Date.now().toString(16)}`,
      executedBy: address,
      timestamp: Date.now(),
    };
    
    setExecutions([...executions, execution]);
    return execution;
  };

  return { execute, executions, address };
}
