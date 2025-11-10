'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface UnstakeRecord {
  pool: string;
  amount: bigint;
  unstakedAt: number;
  cooldown: number;
}

export function useUnstakeTracker() {
  const { address } = useAccount();
  const { data: unstaked } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'unstakedBalance',
    args: [address],
  });
  const [unstakes, setUnstakes] = useState<UnstakeRecord[]>([]);

  useEffect(() => {
    if (!address || !unstaked) return;
    
    const unstake: UnstakeRecord = {
      pool: '0x',
      amount: BigInt(unstaked as string),
      unstakedAt: Date.now(),
      cooldown: 7,
    };
    
    setUnstakes([unstake]);
  }, [address, unstaked]);

  return { unstakes, address };
}
