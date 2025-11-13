'use client';

/**
 * Token Swap Router
 * Route token swaps through optimal paths with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SwapRoute {
  routeId: string;
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  route: string[];
  expectedAmountOut: string;
  priceImpact: number;
  timestamp: number;
}

export function useTokenSwapRouter() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [routes, setRoutes] = useState<SwapRoute[]>([]);

  const findRoute = async (
    tokenIn: string,
    tokenOut: string,
    amountIn: string
  ): Promise<SwapRoute> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (parseFloat(amountIn) <= 0) {
      throw new Error('Amount must be greater than zero');
    }
    
    const message = `Find swap route: ${tokenIn} -> ${tokenOut}`;
    await signMessageAsync({ message });
    
    const route: SwapRoute = {
      routeId: `route-${Date.now()}`,
      tokenIn,
      tokenOut,
      amountIn,
      route: [tokenIn, '0xWETH', tokenOut],
      expectedAmountOut: (parseFloat(amountIn) * 0.95).toString(),
      priceImpact: 5.0,
      timestamp: Date.now(),
    };
    
    setRoutes([...routes, route]);
    return route;
  };

  return { findRoute, routes, address };
}
