'use client';

/**
 * Token Liquidity Locker V2
 * Lock liquidity with enhanced features using Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface LiquidityLock {
  lockId: string;
  poolAddress: string;
  lpTokenAmount: string;
  unlockTime: number;
  lockedBy: string;
  timestamp: number;
}

export function useTokenLiquidityLockerV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [locks, setLocks] = useState<LiquidityLock[]>([]);

  const lockLiquidity = async (
    poolAddress: string,
    lpTokenAmount: string,
    unlockTime: number
  ): Promise<LiquidityLock> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!poolAddress.startsWith('0x')) {
      throw new Error('Invalid pool address format');
    }
    if (unlockTime <= Date.now()) {
      throw new Error('Unlock time must be in the future');
    }
    
    const message = `Lock liquidity: ${poolAddress} until ${new Date(unlockTime).toISOString()}`;
    await signMessageAsync({ message });
    
    const lock: LiquidityLock = {
      lockId: `lock-${Date.now()}`,
      poolAddress,
      lpTokenAmount,
      unlockTime,
      lockedBy: address,
      timestamp: Date.now(),
    };
    
    setLocks([...locks, lock]);
    return lock;
  };

  return { lockLiquidity, locks, address };
}
