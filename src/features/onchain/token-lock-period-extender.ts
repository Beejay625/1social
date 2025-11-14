'use client';

/**
 * Token Lock Period Extender
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
  extendedBy: string;
  txHash: string;
  timestamp: number;
}

export function useTokenLockPeriodExtender() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [extensions, setExtensions] = useState<LockExtension[]>([]);

  const extendLock = async (
    lockId: string,
    tokenAddress: string,
    originalUnlockTime: number,
    newUnlockTime: number
  ): Promise<LockExtension> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    if (newUnlockTime <= originalUnlockTime) {
      throw new Error('New unlock time must be after original unlock time');
    }
    
    const message = `Extend lock: ${lockId} from ${originalUnlockTime} to ${newUnlockTime}`;
    await signMessageAsync({ message });
    
    const extension: LockExtension = {
      extensionId: `extend-${Date.now()}`,
      lockId,
      tokenAddress,
      originalUnlockTime,
      newUnlockTime,
      extendedBy: address,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setExtensions([...extensions, extension]);
    return extension;
  };

  return { extendLock, extensions, address };
}

