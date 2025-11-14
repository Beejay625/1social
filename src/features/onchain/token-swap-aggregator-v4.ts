'use client';

import { useAccount, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SwapRoute {
  path: string[];
  amountOut: bigint;
  priceImpact: number;
  gasEstimate: bigint;
}

export function useTokenSwapAggregatorV4() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [routes, setRoutes] = useState<SwapRoute[]>([]);

  const findBestRoute = async (tokenIn: string, tokenOut: string, amountIn: bigint) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');

    const message = `Find best swap route: ${amountIn} ${tokenIn} for ${tokenOut}`;
    await signMessageAsync({ message });

    const route: SwapRoute = {
      path: [tokenIn, tokenOut],
      amountOut: amountIn * 2n,
      priceImpact: 0.5,
      gasEstimate: 150000n,
    };

    setRoutes([route]);
    return route;
  };

  return {
    findBestRoute,
    routes,
    address,
    isConnected,
  };
}

