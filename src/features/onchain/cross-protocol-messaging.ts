'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ProtocolMessage {
  id: string;
  from: string;
  to: string;
  protocol: string;
  content: string;
  timestamp: number;
}

export function useCrossProtocolMessaging() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [messages, setMessages] = useState<ProtocolMessage[]>([]);

  const sendMessage = async (to: string, protocol: string, content: string) => {
    if (!isConnected || !address) {
      throw new Error('Reown wallet not connected');
    }

    const message = `Message to ${to} on ${protocol}: ${content}\nTimestamp: ${Date.now()}`;
    const signature = await signMessageAsync({ message });

    const protocolMessage: ProtocolMessage = {
      id: `msg_${Date.now()}`,
      from: address,
      to,
      protocol,
      content,
      timestamp: Date.now(),
    };

    setMessages([...messages, protocolMessage]);
    return signature;
  };

  return { sendMessage, messages, isConnected, address };
}
