'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface CalldataDecode {
  calldata: string;
  function: string;
  args: any[];
  wallet: string;
  timestamp: number;
}

export function useContractCalldataDecoder() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [decodes, setDecodes] = useState<CalldataDecode[]>([]);

  const decodeCalldata = async (calldata: string, func: string, args: any[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Decode Calldata: ${calldata.slice(0, 10)}`;
    await signMessageAsync({ message });
    
    const decode: CalldataDecode = {
      calldata,
      function: func,
      args,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setDecodes([...decodes, decode]);
    return decode;
  };

  return { decodeCalldata, decodes, address };
}

