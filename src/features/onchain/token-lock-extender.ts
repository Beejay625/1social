'use client';

/**
 * Token Lock Extender
 * Extend token lock periods with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface LockExtension {
  extensionId: string;
  lockId: string;
  newEndDate: number;
  extendedBy: string;
  timestamp: number;
}

export function useTokenLockExtender() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [extensions, setExtensions] = useState<LockExtension[]>([]);

  const extendLock = async (
    lockId: string,
    newEndDate: number
  ): Promise<LockExtension> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (newEndDate <= Date.now()) {
      throw new Error('New end date must be in the future');
    }
    
    const message = `Extend lock: ${lockId} until ${newEndDate}`;
    await signMessageAsync({ message });
    
    const extension: LockExtension = {
      extensionId: `extend-${Date.now()}`,
      lockId,
      newEndDate,
      extendedBy: address,
      timestamp: Date.now(),
    };
    
    setExtensions([...extensions, extension]);
    return extension;
  };

  return { extendLock, extensions, address };
}
