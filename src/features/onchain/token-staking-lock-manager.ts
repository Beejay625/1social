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

  const lockStake = async (
    stakingPool: string,
    amount: string,
    lockPeriod: number
  ): Promise<StakingLock> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (lockPeriod <= 0) {
      throw new Error('Lock period must be greater than zero');
    }
    
    const message = `Lock stake: ${stakingPool} for ${lockPeriod}ms`;
    await signMessageAsync({ message });
    
    const lock: StakingLock = {
      lockId: `lock-${Date.now()}`,
      stakingPool,
      amount,
      lockPeriod,
      unlockTime: Date.now() + lockPeriod,
      lockedBy: address,
      timestamp: Date.now(),
    };
    
    setLocks([...locks, lock]);
    return lock;
  };

  return { lockStake, locks, address };
}
