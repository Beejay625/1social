'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface FaucetClaim {
  id: string;
  token: string;
  amount: bigint;
  claimedAt: number;
}

export function useTokenFaucet() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [claims, setClaims] = useState<FaucetClaim[]>([]);

  const claimTokens = async (token: string, amount: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: token as `0x${string}`,
      abi: [],
      functionName: 'claim',
      args: [BigInt(amount)],
    });

    const claim: FaucetClaim = {
      id: txHash || '',
      token,
      amount: BigInt(amount),
      claimedAt: Date.now(),
    };

    setClaims([...claims, claim]);
    return txHash;
  };

  return { claimTokens, claims, address };
}


