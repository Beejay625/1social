'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TokenLock {
  id: string;
  locker: string;
  tokenAddress: string;
  amount: string;
  unlockTime: number;
  timestamp: number;
  locked: boolean;
}

export function useSocialTokenLocks() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [locks, setLocks] = useState<TokenLock[]>([]);

  const lockTokens = async (
    tokenAddress: string,
    amount: string,
    unlockTime: number
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Lock Tokens: ${tokenAddress} ${amount} unlock ${unlockTime}`;
    await signMessageAsync({ message });
    
    const lock: TokenLock = {
      id: `lock-${Date.now()}`,
      locker: address,
      tokenAddress,
      amount,
      unlockTime,
      timestamp: Date.now(),
      locked: true,
    };
    
    setLocks([...locks, lock]);
    return lock;
  };

  return { lockTokens, locks, address };
}

