'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface UnstakeEvent {
  unstaker: string;
  amount: bigint;
  pool: string;
  unstakedAt: number;
}

export function useUnstakeTracker() {
  const { address } = useAccount();
  const { data: unstaked } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'unstakedBalance',
    args: [address],
  });
  const [unstakes, setUnstakes] = useState<UnstakeEvent[]>([]);

  useEffect(() => {
    if (!address || !unstaked) return;
    
    const unstake: UnstakeEvent = {
      unstaker: address,
      amount: BigInt(unstaked as string),
      pool: '0x',
      unstakedAt: Date.now(),
    };
    
    setUnstakes([unstake]);
  }, [address, unstaked]);

  return { unstakes, address };
}
