'use client';

/**
 * Token Lock Extender
 * Extend token lock periods with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface LockExtension {
  extensionId: string;
  lockId: string;
  tokenAddress: string;
  originalUnlockTime: number;
  newUnlockTime: number;
  extensionPeriod: number;
  timestamp: number;
}

export function useTokenLockExtender() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [extensions, setExtensions] = useState<LockExtension[]>([]);

  const extendLock = async (
    lockId: string,
    tokenAddress: string,
    originalUnlockTime: number,
    extensionPeriod: number
  ): Promise<LockExtension> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (extensionPeriod <= 0) {
      throw new Error('Extension period must be greater than zero');
    }
    
    const message = `Extend lock: ${lockId} by ${extensionPeriod}ms`;
    await signMessageAsync({ message });
    
    const extension: LockExtension = {
      extensionId: `extend-${Date.now()}`,
      lockId,
      tokenAddress,
      originalUnlockTime,
      newUnlockTime: originalUnlockTime + extensionPeriod,
      extensionPeriod,
      timestamp: Date.now(),
    };
    
    setExtensions([...extensions, extension]);
    return extension;
  };

  return { extendLock, extensions, address };
}
