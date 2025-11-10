'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SwapRoute {
  from: string;
  to: string;
  path: string[];
  amountIn: string;
  amountOut: string;
  wallet: string;
}

export function useTokenSwapRouter() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [routes, setRoutes] = useState<SwapRoute[]>([]);

  const findRoute = async (from: string, to: string, amountIn: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Find Route: ${from} -> ${to} ${amountIn}`;
    await signMessageAsync({ message });
    
    const route: SwapRoute = {
      from,
      to,
      path: [from, to],
      amountIn,
      amountOut: '0',
      wallet: address,
    };
    
    setRoutes([...routes, route]);
    return route;
  };

  return { findRoute, routes, address };
}
