'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface FunctionSignature {
  function: string;
  signature: string;
  params: string[];
  wallet: string;
  timestamp: number;
}

export function useContractFunctionSignature() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [signatures, setSignatures] = useState<FunctionSignature[]>([]);

  const generateSignature = async (func: string, params: string[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Function Signature: ${func}`;
    await signMessageAsync({ message });
    
    const signature: FunctionSignature = {
      function: func,
      signature: `0x${Date.now().toString(16)}`,
      params,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setSignatures([...signatures, signature]);
    return signature;
  };

  return { generateSignature, signatures, address };
}


