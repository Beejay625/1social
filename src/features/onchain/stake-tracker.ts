'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface StakeEvent {
  staker: string;
  amount: bigint;
  pool: string;
  stakedAt: number;
}

export function useStakeTracker() {
  const { address } = useAccount();
  const { data: staked } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'balanceOf',
    args: [address],
  });
  const [stakes, setStakes] = useState<StakeEvent[]>([]);

  useEffect(() => {
    if (!address || !staked) return;
    
    const stake: StakeEvent = {
      staker: address,
      amount: BigInt(staked as string),
      pool: '0x',
      stakedAt: Date.now(),
    };
    
    setStakes([stake]);
  }, [address, staked]);

  return { stakes, address };
}
