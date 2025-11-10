'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface VestingClaim {
  id: string;
  vestingId: string;
  amount: bigint;
  claimedAt: number;
}

export function useVestingClaimer() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [claims, setClaims] = useState<VestingClaim[]>([]);

  const claimVesting = async (vestingId: string, amount: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'claim',
      args: [vestingId, BigInt(amount)],
    });

    const claim: VestingClaim = {
      id: txHash || '',
      vestingId,
      amount: BigInt(amount),
      claimedAt: Date.now(),
    };

    setClaims([...claims, claim]);
    return txHash;
  };

  return { claimVesting, claims, address };
}

