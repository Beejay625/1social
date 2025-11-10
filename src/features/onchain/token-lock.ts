'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface TokenLock {
  id: string;
  token: string;
  amount: bigint;
  unlockTime: number;
  locked: boolean;
}

export function useTokenLock() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [locks, setLocks] = useState<TokenLock[]>([]);

  const lockTokens = async (token: string, amount: string, unlockTime: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: token as `0x${string}`,
      abi: [],
      functionName: 'lock',
      args: [BigInt(amount), unlockTime],
    });

    const lock: TokenLock = {
      id: txHash || '',
      token,
      amount: BigInt(amount),
      unlockTime,
      locked: true,
    };

    setLocks([...locks, lock]);
    return txHash;
  };

  return { lockTokens, locks, address };
}

