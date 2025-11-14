'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface LockClaim {
  id: string;
  lockId: string;
  amount: bigint;
  claimedAt: number;
}

export function useTokenLockClaimer() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [claims, setClaims] = useState<LockClaim[]>([]);

  const claimLock = async (lockId: string, amount: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'claim',
      args: [lockId, BigInt(amount)],
    });

    const claim: LockClaim = {
      id: txHash || '',
      lockId,
      amount: BigInt(amount),
      claimedAt: Date.now(),
    };

    setClaims([...claims, claim]);
    return txHash;
  };

  return { claimLock, claims, address };
}


