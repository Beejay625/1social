'use client';

import { useAccount, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SwapSimulation {
  tokenIn: string;
  tokenOut: string;
  amountIn: bigint;
  amountOut: bigint;
  priceImpact: number;
  slippage: number;
}

export function useTokenSwapSimulatorV2() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [simulation, setSimulation] = useState<SwapSimulation | null>(null);

  const simulate = async (tokenIn: string, tokenOut: string, amountIn: bigint) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');

    const message = `Simulate swap: ${amountIn} ${tokenIn} for ${tokenOut}`;
    await signMessageAsync({ message });

    const sim: SwapSimulation = {
      tokenIn,
      tokenOut,
      amountIn,
      amountOut: amountIn * 2n,
      priceImpact: 0.5,
      slippage: 0.3,
    };

    setSimulation(sim);
    return sim;
  };

  return {
    simulate,
    simulation,
    address,
    isConnected,
  };
}

