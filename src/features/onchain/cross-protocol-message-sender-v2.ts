'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ProtocolMessage {
  protocol: 'farcaster' | 'lens' | 'mirror';
  content: string;
  recipient?: string;
}

export function useCrossProtocolMessageSenderV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [sending, setSending] = useState(false);

  const send = async (message: ProtocolMessage) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setSending(true);

    try {
      const msg = `Send message to ${message.protocol}: ${message.content.substring(0, 50)}`;
      await signMessageAsync({ message: msg });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'sendMessage',
        args: [message.protocol, message.content, message.recipient || address],
      });
    } finally {
      setSending(false);
    }
  };

  return {
    send,
    sending,
    address,
    isConnected,
  };
}

