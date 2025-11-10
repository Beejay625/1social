'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface FunctionABI {
  name: string;
  inputs: any[];
  outputs: any[];
  stateMutability: string;
  wallet: string;
  timestamp: number;
}

export function useFunctionABIExtractor() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [functions, setFunctions] = useState<FunctionABI[]>([]);

  const extractFunction = async (name: string, inputs: any[], outputs: any[], stateMutability: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Extract Function: ${name}`;
    await signMessageAsync({ message });
    
    const func: FunctionABI = {
      name,
      inputs,
      outputs,
      stateMutability,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setFunctions([...functions, func]);
    return func;
  };

  return { extractFunction, functions, address };
}

