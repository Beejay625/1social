'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface EncodedCall {
  function: string;
  args: any[];
  calldata: string;
  wallet: string;
  timestamp: number;
}

export function useCalldataEncoder() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [encoded, setEncoded] = useState<EncodedCall[]>([]);

  const encodeCall = async (func: string, args: any[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Encode: ${func}(${args.join(', ')})`;
    await signMessageAsync({ message });
    
    const encodedCall: EncodedCall = {
      function: func,
      args,
      calldata: `0x${Date.now().toString(16)}`,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setEncoded([...encoded, encodedCall]);
    return encodedCall;
  };

  return { encodeCall, encoded, address };
}


