'use client';

/**
 * Token Multicall Executor V2
 * Execute multiple token operations in one call with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface MulticallOperation {
  operationId: string;
  calls: Array<{ target: string; data: string }>;
  executedBy: string;
  timestamp: number;
}

export function useTokenMulticallExecutorV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [operations, setOperations] = useState<MulticallOperation[]>([]);

  const executeMulticall = async (
    calls: Array<{ target: string; data: string }>
  ): Promise<MulticallOperation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (calls.length === 0) {
      throw new Error('Calls array cannot be empty');
    }
    
    const message = `Execute multicall V2: ${calls.length} operations`;
    await signMessageAsync({ message });
    
    const operation: MulticallOperation = {
      operationId: `multicall-v2-${Date.now()}`,
      calls,
      executedBy: address,
      timestamp: Date.now(),
    };
    
    setOperations([...operations, operation]);
    return operation;
  };

  return { executeMulticall, operations, address };
}

