'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface MultiSend {
  recipients: string[];
  amounts: bigint[];
  executed: boolean;
  wallet: string;
  timestamp: number;
}

export function useContractMultiSendExecutor() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [multiSends, setMultiSends] = useState<MultiSend[]>([]);

  const executeMultiSend = async (recipients: string[], amounts: bigint[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Multi-Send: ${recipients.length} recipients`;
    await signMessageAsync({ message });
    
    const multiSend: MultiSend = {
      recipients,
      amounts,
      executed: true,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setMultiSends([...multiSends, multiSend]);
    return multiSend;
  };

  return { executeMultiSend, multiSends, address };
}

