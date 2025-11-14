'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Timelock {
  id: string;
  creator: string;
  contentId: string;
  action: 'publish' | 'update' | 'delete' | 'transfer';
  unlockTime: number;
  timestamp: number;
  executed: boolean;
}

export function useSocialContentTimelock() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [timelocks, setTimelocks] = useState<Timelock[]>([]);

  const createTimelock = async (
    contentId: string,
    action: 'publish' | 'update' | 'delete' | 'transfer',
    unlockTime: number
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Create Timelock: ${contentId} ${action} unlock ${unlockTime}`;
    await signMessageAsync({ message });
    
    const timelock: Timelock = {
      id: `timelock-${Date.now()}`,
      creator: address,
      contentId,
      action,
      unlockTime,
      timestamp: Date.now(),
      executed: false,
    };
    
    setTimelocks([...timelocks, timelock]);
    return timelock;
  };

  return { createTimelock, timelocks, address };
}


