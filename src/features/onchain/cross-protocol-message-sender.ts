'use client';

/**
 * Cross-Protocol Message Sender
 * Send messages across Farcaster, Lens, and Mirror protocols with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface CrossProtocolMessage {
  messageId: string;
  content: string;
  protocols: string[];
  sentBy: string;
  timestamp: number;
}

export function useCrossProtocolMessageSender() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [messages, setMessages] = useState<CrossProtocolMessage[]>([]);

  const sendMessage = async (
    content: string,
    protocols: string[]
  ): Promise<CrossProtocolMessage> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!content || content.length === 0) {
      throw new Error('Content cannot be empty');
    }
    if (protocols.length === 0) {
      throw new Error('At least one protocol must be specified');
    }
    
    const message = `Send cross-protocol message: ${protocols.join(', ')}`;
    await signMessageAsync({ message });
    
    const crossProtocolMessage: CrossProtocolMessage = {
      messageId: `message-${Date.now()}`,
      content,
      protocols,
      sentBy: address,
      timestamp: Date.now(),
    };
    
    setMessages([...messages, crossProtocolMessage]);
    return crossProtocolMessage;
  };

  return { sendMessage, messages, address };
}
