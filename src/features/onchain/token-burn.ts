'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface BurnRecord {
  id: string;
  amount: bigint;
  token: string;
  timestamp: number;
}

export function useTokenBurn() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [burns, setBurns] = useState<BurnRecord[]>([]);

  const burnTokens = async (amount: string, token: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: token as `0x${string}`,
      abi: [],
      functionName: 'burn',
      args: [BigInt(amount)],
    });

    const burn: BurnRecord = {
      id: txHash || '',
      amount: BigInt(amount),
      token,
      timestamp: Date.now(),
    };

    setBurns([...burns, burn]);
    return txHash;
  };

  return { burnTokens, burns, address };
}

