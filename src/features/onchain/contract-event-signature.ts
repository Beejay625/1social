'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface EventSignature {
  event: string;
  signature: string;
  indexed: boolean;
  wallet: string;
  timestamp: number;
}

export function useContractEventSignature() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [signatures, setSignatures] = useState<EventSignature[]>([]);

  const generateSignature = async (event: string, indexed: boolean) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Event Signature: ${event}`;
    await signMessageAsync({ message });
    
    const signature: EventSignature = {
      event,
      signature: `0x${Date.now().toString(16)}`,
      indexed,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setSignatures([...signatures, signature]);
    return signature;
  };

  return { generateSignature, signatures, address };
}


