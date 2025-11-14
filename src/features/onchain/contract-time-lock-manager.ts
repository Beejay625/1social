'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TimeLock {
  id: string;
  unlockTime: number;
  locked: boolean;
  wallet: string;
  timestamp: number;
}

export function useContractTimeLockManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [timeLocks, setTimeLocks] = useState<TimeLock[]>([]);

  const createTimeLock = async (id: string, unlockTime: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Create TimeLock: ${id} until ${unlockTime}`;
    await signMessageAsync({ message });
    
    const timeLock: TimeLock = {
      id,
      unlockTime,
      locked: true,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setTimeLocks([...timeLocks, timeLock]);
    return timeLock;
  };

  return { createTimeLock, timeLocks, address };
}


