'use client';

/**
 * Token Lock Manager
 * Lock and unlock tokens with time-based restrictions using Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TokenLock {
  lockId: string;
  tokenAddress: string;
  amount: string;
  unlockTime: number;
  lockedBy: string;
  timestamp: number;
}

export function useTokenLockManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [locks, setLocks] = useState<TokenLock[]>([]);

  const lockTokens = async (
    tokenAddress: string,
    amount: string,
    unlockTime: number
  ): Promise<TokenLock> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    if (unlockTime <= Date.now()) {
      throw new Error('Unlock time must be in the future');
    }
    
    const message = `Lock tokens: ${tokenAddress} ${amount} until ${new Date(unlockTime).toISOString()}`;
    await signMessageAsync({ message });
    
    const lock: TokenLock = {
      lockId: `lock-${Date.now()}`,
      tokenAddress,
      amount,
      unlockTime,
      lockedBy: address,
      timestamp: Date.now(),
    };
    
    setLocks([...locks, lock]);
    return lock;
  };

  return { lockTokens, locks, address };
}
