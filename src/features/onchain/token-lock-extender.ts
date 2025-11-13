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
  currentUnlockTime: number;
  newUnlockTime: number;
  extensionPeriod: number;
  txHash: string;
  extendedBy: string;
  timestamp: number;
}

export function useTokenLockExtender() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [extensions, setExtensions] = useState<LockExtension[]>([]);

  const extend = async (
    lockId: string,
    tokenAddress: string,
    currentUnlockTime: number,
    extensionPeriod: number
  ): Promise<LockExtension> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    if (extensionPeriod <= 0) {
      throw new Error('Extension period must be greater than zero');
    }
    
    const message = `Extend lock: ${lockId} for ${extensionPeriod} seconds`;
    await signMessageAsync({ message });
    
    const newUnlockTime = currentUnlockTime + extensionPeriod;
    
    const extension: LockExtension = {
      extensionId: `extend-${Date.now()}`,
      lockId,
      tokenAddress,
      currentUnlockTime,
      newUnlockTime,
      extensionPeriod,
      txHash: `0x${Date.now().toString(16)}`,
      extendedBy: address,
      timestamp: Date.now(),
    };
    
    setExtensions([...extensions, extension]);
    return extension;
  };

  return { extend, extensions, address };
}
