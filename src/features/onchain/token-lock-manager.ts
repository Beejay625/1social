'use client';

import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';
import { parseAbi } from 'viem';

export interface TokenLock {
  tokenAddress: string;
  amount: string;
  unlockTime: number;
  lockId: string;
}

export function useTokenLockManager() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [locks, setLocks] = useState<TokenLock[]>([]);

  const lockTokens = async (tokenAddress: string, amount: string, unlockTime: number) => {
    if (!address || !isConnected) throw new Error('Reown wallet not connected');
    
    const message = `Lock ${amount} tokens until ${new Date(unlockTime).toISOString()}`;
    await signMessageAsync({ message });
    
    const lock: TokenLock = {
      tokenAddress,
      amount,
      unlockTime,
      lockId: `lock_${Date.now()}`,
    };
    
    setLocks([...locks, lock]);
    return lock;
  };

  const unlockTokens = async (lockId: string) => {
    if (!address || !isConnected) throw new Error('Reown wallet not connected');
    
    const message = `Unlock tokens: ${lockId}`;
    await signMessageAsync({ message });
    
    setLocks(locks.filter(lock => lock.lockId !== lockId));
  };

  return { 
    lockTokens, 
    unlockTokens, 
    locks, 
    address, 
    isConnected,
    hash,
    isPending,
    isConfirming,
    isConfirmed
  };
}
