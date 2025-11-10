'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface FunctionCall {
  contract: string;
  functionName: string;
  args: unknown[];
  result: unknown;
}

export function useContractFunctionCaller() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [calls, setCalls] = useState<FunctionCall[]>([]);

  const callFunction = async (contract: string, functionName: string, args: unknown[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: contract as `0x${string}`,
      abi: [],
      functionName,
      args,
    });

    const call: FunctionCall = {
      contract,
      functionName,
      args,
      result: txHash,
    };

    setCalls([...calls, call]);
    return txHash;
  };

  return { callFunction, calls, address };
}

