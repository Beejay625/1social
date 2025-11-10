'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface Swap {
  id: string;
  fromToken: string;
  toToken: string;
  amountIn: bigint;
  amountOut: bigint;
}

export function useTokenSwapAggregator() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [swaps, setSwaps] = useState<Swap[]>([]);

  const swapTokens = async (fromToken: string, toToken: string, amount: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'swap',
      args: [fromToken, toToken, BigInt(amount)],
    });

    const swap: Swap = {
      id: txHash || '',
      fromToken,
      toToken,
      amountIn: BigInt(amount),
      amountOut: BigInt(0),
    };

    setSwaps([...swaps, swap]);
    return txHash;
  };

  return { swapTokens, swaps, address };
}
