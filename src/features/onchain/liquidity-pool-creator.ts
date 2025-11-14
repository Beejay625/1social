'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface LiquidityPool {
  id: string;
  tokenA: string;
  tokenB: string;
  amountA: bigint;
  amountB: bigint;
  poolAddress: string;
}

export function useLiquidityPoolCreator() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [pools, setPools] = useState<LiquidityPool[]>([]);

  const createPool = async (tokenA: string, tokenB: string, amountA: string, amountB: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'createPool',
      args: [tokenA, tokenB, BigInt(amountA), BigInt(amountB)],
    });

    const pool: LiquidityPool = {
      id: txHash || '',
      tokenA,
      tokenB,
      amountA: BigInt(amountA),
      amountB: BigInt(amountB),
      poolAddress: `0x${Date.now().toString(16)}`,
    };

    setPools([...pools, pool]);
    return txHash;
  };

  return { createPool, pools, address };
}


