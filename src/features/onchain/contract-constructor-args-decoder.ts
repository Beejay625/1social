'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ConstructorArgs {
  contract: string;
  args: any[];
  decoded: boolean;
  wallet: string;
  timestamp: number;
}

export function useContractConstructorArgsDecoder() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [decodedArgs, setDecodedArgs] = useState<ConstructorArgs[]>([]);

  const decodeArgs = async (contract: string, args: any[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Decode Constructor Args: ${contract}`;
    await signMessageAsync({ message });
    
    const decoded: ConstructorArgs = {
      contract,
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

