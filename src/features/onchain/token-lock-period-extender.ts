'use client';

/**
 * Token Lock Period Extender
 * Extend token lock periods with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface LockExtension {
  extensionId: string;
  lockId: string;
  tokenAddress: string;
  newEndDate: number;
  extendedBy: string;
  timestamp: number;
}

export function useTokenLockPeriodExtender() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [extensions, setExtensions] = useState<LockExtension[]>([]);

  const extendLockPeriod = async (
    lockId: string,
    tokenAddress: string,
    newEndDate: number
  ): Promise<LockExtension> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    
    const message = `Extend lock period: ${lockId} for ${tokenAddress} until ${newEndDate}`;
    await signMessageAsync({ message });
    
    const extension: LockExtension = {
      extensionId: `extend-${Date.now()}`,
      lockId,
      tokenAddress,
      newEndDate,
      extendedBy: address,
      timestamp: Date.now(),
    };
    
    setExtensions([...extensions, extension]);
    return extension;
  };

  return { extendLockPeriod, extensions, address };
}
