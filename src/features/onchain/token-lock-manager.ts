'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface Lock {
  id: string;
  token: string;
  amount: bigint;
  unlockTime: number;
  locked: boolean;
}

export function useTokenLockManager() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [locks, setLocks] = useState<Lock[]>([]);

  const createLock = async (token: string, amount: string, unlockTime: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: token as `0x${string}`,
      abi: [],
      functionName: 'lock',
      args: [BigInt(amount), unlockTime],
    });

    const lock: Lock = {
      id: txHash || '',
      token,
      amount: BigInt(amount),
      unlockTime,
      locked: true,
    };

    setLocks([...locks, lock]);
    return txHash;
  };

  return { createLock, locks, address };
}
