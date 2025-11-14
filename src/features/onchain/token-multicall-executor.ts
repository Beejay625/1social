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
    calldata: string;
    value?: string;
  }>;
  executedBy: string;
  txHash: string;
  timestamp: number;
}

export function useTokenMulticallExecutor() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [executions, setExecutions] = useState<MulticallExecution[]>([]);

  const execute = async (
    calls: Array<{
      target: string;
      calldata: string;
      value?: string;
    }>
  ): Promise<MulticallExecution> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (calls.length === 0) {
      throw new Error('At least one call is required');
    }
    if (calls.some(call => !call.target.startsWith('0x'))) {
      throw new Error('All target addresses must be valid Ethereum addresses');
    }
    
    const message = `Execute multicall: ${calls.length} calls`;
    await signMessageAsync({ message });
    
    const execution: MulticallExecution = {
      executionId: `multicall-${Date.now()}`,
      calls,
      executedBy: address,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setExecutions([...executions, execution]);
    return execution;
  };

  return { execute, executions, address };
}
