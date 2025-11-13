'use client';

/**
 * Token Staking Lock Manager
 * Manage staking lock periods with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface LockManagement {
  lockId: string;
  poolAddress: string;
  action: 'lock' | 'extend' | 'unlock';
  amount: string;
  lockPeriod: number;
  txHash?: string;
  timestamp: number;
}

export function useTokenStakingLockManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [locks, setLocks] = useState<LockManagement[]>([]);

  const manage = async (
    poolAddress: string,
    action: 'lock' | 'extend' | 'unlock',
    amount: string,
    lockPeriod?: number
  ): Promise<LockManagement> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!poolAddress.startsWith('0x')) {
      throw new Error('Invalid pool address format');
    }
    if (action === 'lock' && (!lockPeriod || lockPeriod <= 0)) {
      throw new Error('Lock period is required for lock action');
    }
    
    const message = `Manage staking lock: ${poolAddress} ${action} ${amount}`;
    await signMessageAsync({ message });
    
    const lock: LockManagement = {
      lockId: `lock-${Date.now()}`,
      poolAddress,
      action,
      amount,
      lockPeriod: lockPeriod || 0,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setLocks([...locks, lock]);
    return lock;
  };

  return { manage, locks, address };
}
