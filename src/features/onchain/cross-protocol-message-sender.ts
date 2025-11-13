'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ProtocolMessage {
  protocol: 'farcaster' | 'lens' | 'mirror';
  recipient: string;
  content: string;
  txHash: string;
  timestamp: number;
}

export function useCrossProtocolMessageSender() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [messages, setMessages] = useState<ProtocolMessage[]>([]);

  const sendMessage = async (
    protocol: 'farcaster' | 'lens' | 'mirror',
    recipient: string,
    content: string
  ): Promise<ProtocolMessage> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Send ${protocol} message to ${recipient}`;
    await signMessageAsync({ message });
    
    const protocolMessage: ProtocolMessage = {
      protocol,
      recipient,
      content,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setMessages([...messages, protocolMessage]);
    return protocolMessage;
  };

  return { sendMessage, messages, address };
}

