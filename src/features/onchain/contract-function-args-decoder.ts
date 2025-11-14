'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface FunctionArgs {
  contract: string;
  function: string;
  args: any[];
  decoded: boolean;
  wallet: string;
  timestamp: number;
}

export function useContractFunctionArgsDecoder() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [decodedArgs, setDecodedArgs] = useState<FunctionArgs[]>([]);

  const decodeArgs = async (contract: string, func: string, args: any[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Decode Function Args: ${contract}.${func}`;
    await signMessageAsync({ message });
    
    const decoded: FunctionArgs = {
      contract,
      function: func,
      args,
      decoded: true,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setDecodedArgs([...decodedArgs, decoded]);
    return decoded;
  };

  return { decodeArgs, decodedArgs, address };
}


