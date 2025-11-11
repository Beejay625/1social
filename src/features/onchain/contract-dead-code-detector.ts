'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface DeadCode {
  contract: string;
  functions: string[];
  unused: boolean;
  wallet: string;
  timestamp: number;
}

export function useContractDeadCodeDetector() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [deadCodes, setDeadCodes] = useState<DeadCode[]>([]);

  const detectDeadCode = async (contract: string, functions: string[], unused: boolean) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Detect Dead Code: ${contract}`;
    await signMessageAsync({ message });
    
    const deadCode: DeadCode = {
      contract,
      functions,
      unused,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setDeadCodes([...deadCodes, deadCode]);
    return deadCode;
  };

  return { detectDeadCode, deadCodes, address };
}

