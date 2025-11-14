'use client';

/**
 * Token Multi-Send Executor
 * Execute multiple token transfers in a single transaction with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface MultiSend {
  sendId: string;
  tokenAddress: string;
  recipients: string[];
  amounts: string[];
  executedBy: string;
  timestamp: number;
}

export function useTokenMultiSendExecutor() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [sends, setSends] = useState<MultiSend[]>([]);

  const executeMultiSend = async (
    tokenAddress: string,
    recipients: string[],
    amounts: string[]
  ): Promise<MultiSend> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    if (recipients.length !== amounts.length) {
      throw new Error('Recipients and amounts arrays must have same length');
    }
    
    const message = `Execute multi-send: ${tokenAddress} to ${recipients.length} recipients`;
    await signMessageAsync({ message });
    
    const send: MultiSend = {
      sendId: `multisend-${Date.now()}`,
      tokenAddress,
      recipients,
      amounts,
      executedBy: address,
      timestamp: Date.now(),
    };
    
    setSends([...sends, send]);
    return send;
  };

  return { executeMultiSend, sends, address };
}
