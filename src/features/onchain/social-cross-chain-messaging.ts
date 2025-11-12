'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface CrossChainMessage {
  id: string;
  sender: string;
  recipient: string;
  fromChain: string;
  toChain: string;
  message: string;
  timestamp: number;
  status: 'pending' | 'sent' | 'delivered';
}

export function useSocialCrossChainMessaging() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [messages, setMessages] = useState<CrossChainMessage[]>([]);

  const sendMessage = async (
    recipient: string,
    fromChain: string,
    toChain: string,
    message: string
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const messageText = `Send Message: ${recipient} from ${fromChain} to ${toChain}`;
    await signMessageAsync({ message: messageText });
    
    const crossChainMessage: CrossChainMessage = {
      id: `msg-${Date.now()}`,
      sender: address,
      recipient,
      fromChain,
      toChain,
      message,
      timestamp: Date.now(),
      status: 'sent',
    };
    
    setMessages([...messages, crossChainMessage]);
    return crossChainMessage;
  };

  return { sendMessage, messages, address };
}

