'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface EventArgs {
  contract: string;
  event: string;
  args: any[];
  decoded: boolean;
  wallet: string;
  timestamp: number;
}

export function useContractEventArgsDecoder() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [decodedArgs, setDecodedArgs] = useState<EventArgs[]>([]);

  const decodeArgs = async (contract: string, event: string, args: any[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Decode Event Args: ${contract}.${event}`;
    await signMessageAsync({ message });
    
    const decoded: EventArgs = {
      contract,
      event,
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

