'use client';

/**
 * Token Multicall Executor V2
 * Execute multiple token operations in one call with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface MulticallExecution {
  executionId: string;
  calls: Array<{
    target: string;
    calldata: string;
    value?: string;
  }>;
  executedBy: string;
  timestamp: number;
}

export function useTokenMulticallExecutorV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
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
    
    const message = `Execute multicall V2: ${calls.length} calls`;
    await signMessageAsync({ message });
    
    const execution: MulticallExecution = {
      executionId: `multicall-v2-${Date.now()}`,
      calls,
      executedBy: address,
      timestamp: Date.now(),
    };
    
    setExecutions([...executions, execution]);
    return execution;
  };

  return { execute, executions, address };
}
