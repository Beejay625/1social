'use client';

/**
 * Token Staking Lock Manager
 * Manage staking lock periods with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface StakingLock {
  lockId: string;
  stakingPool: string;
  amount: string;
  lockPeriod: number;
  unlockTime: number;
  lockedBy: string;
  timestamp: number;
}

export function useTokenStakingLockManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [locks, setLocks] = useState<StakingLock[]>([]);

  const createLock = async (
    stakingPool: string,
    amount: string,
    lockPeriod: number
  ): Promise<StakingLock> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!stakingPool.startsWith('0x')) {
      throw new Error('Invalid staking pool address format');
    }
    if (lockPeriod <= 0) {
      throw new Error('Lock period must be greater than zero');
    }
    
    const message = `Create staking lock: ${stakingPool} for ${lockPeriod} seconds`;
    await signMessageAsync({ message });
    
    const lock: StakingLock = {
      lockId: `lock-${Date.now()}`,
      stakingPool,
      amount,
      lockPeriod,
      unlockTime: Date.now() + (lockPeriod * 1000),
      lockedBy: address,
      timestamp: Date.now(),
    };
    
    setLocks([...locks, lock]);
    return lock;
  };

  return { createLock, locks, address };
}
