'use client';

import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

export interface LiquidityLock {
  poolAddress: string;
  tokenA: string;
  tokenB: string;
  amountA: string;
  amountB: string;
  lockUntil: number;
  lockId: string;
}

export function useTokenLiquidityLockerV2() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [locks, setLocks] = useState<LiquidityLock[]>([]);

  const lockLiquidity = async (
    poolAddress: string,
    tokenA: string,
    tokenB: string,
    amountA: string,
    amountB: string,
    lockUntil: number
  ) => {
    if (!address || !isConnected) throw new Error('Reown wallet not connected');
    
    const message = `Lock liquidity: ${amountA} ${tokenA} + ${amountB} ${tokenB} until ${new Date(lockUntil).toISOString()}`;
    await signMessageAsync({ message });
    
    const lock: LiquidityLock = {
      poolAddress,
      tokenA,
      tokenB,
      amountA,
      amountB,
      lockUntil,
      lockId: `liq_lock_${Date.now()}`,
    };
    
    setLocks([...locks, lock]);
    return lock;
  };

  return { 
    lockLiquidity, 
    locks, 
    address, 
    isConnected,
    hash,
    isPending,
    isConfirming,
    isConfirmed
  };
}

