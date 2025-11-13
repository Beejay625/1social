'use client';

/**
 * Token Swap Simulator
 * Simulates token swaps with price impact calculations via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SwapSimulation {
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  amountOut: string;
  priceImpact: string;
  route: string[];
  timestamp: number;
}

export function useTokenSwapSimulator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [simulations, setSimulations] = useState<SwapSimulation[]>([]);

  const simulate = async (
    tokenIn: string,
    tokenOut: string,
    amountIn: string
  ): Promise<SwapSimulation> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Simulate swap: ${tokenIn} -> ${tokenOut}`;
    await signMessageAsync({ message });
    
    const simulation: SwapSimulation = {
      tokenIn,
      tokenOut,
      amountIn,
      amountOut: (parseFloat(amountIn) * 0.95).toString(),
      priceImpact: '5.0',
      route: [tokenIn, tokenOut],
      timestamp: Date.now(),
    };
    
    setSimulations([...simulations, simulation]);
    return simulation;
  };

  return { simulate, simulations, address };
}

