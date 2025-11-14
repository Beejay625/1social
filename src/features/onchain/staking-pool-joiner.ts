'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface PoolJoin {
  pool: string;
  amount: bigint;
  joined: boolean;
  apy: number;
}

export function useStakingPoolJoiner() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [joins, setJoins] = useState<PoolJoin[]>([]);

  const joinPool = async (pool: string, amount: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: pool as `0x${string}`,
      abi: [],
      functionName: 'stake',
      args: [BigInt(amount)],
    });

    const join: PoolJoin = {
      pool,
      amount: BigInt(amount),
      joined: true,
      apy: 5.0,
    };

    setJoins([...joins, join]);
    return txHash;
  };

  return { joinPool, joins, address };
}


