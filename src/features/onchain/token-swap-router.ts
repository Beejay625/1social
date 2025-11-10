'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface SwapRoute {
  id: string;
  fromToken: string;
  toToken: string;
  amountIn: bigint;
  amountOut: bigint;
  route: string[];
}

export function useTokenSwapRouter() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [routes, setRoutes] = useState<SwapRoute[]>([]);

  const swapWithRoute = async (fromToken: string, toToken: string, amount: string, route: string[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'swap',
      args: [fromToken, toToken, BigInt(amount), route],
    });

    const swapRoute: SwapRoute = {
      id: txHash || '',
      fromToken,
      toToken,
      amountIn: BigInt(amount),
      amountOut: BigInt(0),
      route,
    };

    setRoutes([...routes, swapRoute]);
    return txHash;
  };

  return { swapWithRoute, routes, address };
}

