'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ProtocolMessage {
  from: string;
  to: string;
  protocol: string;
  message: string;
  timestamp: number;
}

export function useCrossProtocolMessaging() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [messages, setMessages] = useState<ProtocolMessage[]>([]);

  const sendMessage = async (to: string, protocol: string, message: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const msg = `Message to ${to}: ${message}`;
    await signMessageAsync({ message: msg });
    
    const protocolMessage: ProtocolMessage = {
      from: address,
      to,
      protocol,
      message,
      timestamp: Date.now(),
    };
    
    setMessages([...messages, protocolMessage]);
    return protocolMessage;
  };

  return { sendMessage, messages, address };
}

