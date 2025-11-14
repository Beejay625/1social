'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface CrossChainMessage {
  id: string;
  targetChain: number;
  message: string;
  sent: boolean;
  received: boolean;
}

export function useCrossChainMessaging() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [messages, setMessages] = useState<CrossChainMessage[]>([]);

  const sendMessage = async (targetChain: number, message: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'sendMessage',
      args: [targetChain, message],
    });

    const msg: CrossChainMessage = {
      id: txHash || '',
      targetChain,
      message,
      sent: true,
      received: false,
    };

    setMessages([...messages, msg]);
    return txHash;
  };

  return { sendMessage, messages, address };
}


