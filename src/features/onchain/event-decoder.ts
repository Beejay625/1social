'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface DecodedEvent {
  eventName: string;
  args: Record<string, any>;
  topics: string[];
  wallet: string;
  timestamp: number;
}

export function useEventDecoder() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [decoded, setDecoded] = useState<DecodedEvent[]>([]);

  const decodeEvent = async (eventName: string, topics: string[], data: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Decode Event: ${eventName}`;
    await signMessageAsync({ message });
    
    const decodedEvent: DecodedEvent = {
      eventName,
      args: {},
      topics,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setDecoded([...decoded, decodedEvent]);
    return decodedEvent;
  };

  return { decodeEvent, decoded, address };
}


