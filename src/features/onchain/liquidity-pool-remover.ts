'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface LiquidityRemoval {
  pool: string;
  lpTokens: bigint;
  removed: boolean;
  tokensReceived: bigint[];
}

export function useLiquidityPoolRemover() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [removals, setRemovals] = useState<LiquidityRemoval[]>([]);

  const removeLiquidity = async (pool: string, lpTokens: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: pool as `0x${string}`,
      abi: [],
      functionName: 'removeLiquidity',
      args: [BigInt(lpTokens)],
    });

    const removal: LiquidityRemoval = {
      pool,
      lpTokens: BigInt(lpTokens),
      removed: true,
      tokensReceived: [BigInt(0), BigInt(0)],
    };

    setRemovals([...removals, removal]);
    return txHash;
  };

  return { removeLiquidity, removals, address };
}


