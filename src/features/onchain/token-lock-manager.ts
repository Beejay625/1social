'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface LockedToken {
  token: string;
  amount: string;
  unlockDate: number;
  wallet: string;
}

export function useTokenLockManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [locks, setLocks] = useState<LockedToken[]>([]);

  const lockTokens = async (token: string, amount: string, unlockDate: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Lock: ${amount} ${token} until ${unlockDate}`;
    await signMessageAsync({ message });
    
    const lock: LockedToken = {
      token,
      amount,
      unlockDate,
      wallet: address,
    };
    
    setLocks([...locks, lock]);
    return lock;
  };

  return { lockTokens, locks, address };
}

