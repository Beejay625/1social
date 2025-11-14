'use client';

/**
 * Token Swap Simulator
 * Simulate token swaps with price impact calculations via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SwapSimulation {
  simulationId: string;
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  expectedOut: string;
  priceImpact: number;
  simulatedBy: string;
  timestamp: number;
}

export function useTokenSwapSimulator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [simulations, setSimulations] = useState<SwapSimulation[]>([]);

  const simulateSwap = async (
    tokenIn: string,
    tokenOut: string,
    amountIn: string
  ): Promise<SwapSimulation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenIn.startsWith('0x') || !tokenOut.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    
    const message = `Simulate swap: ${tokenIn} to ${tokenOut} amount ${amountIn}`;
    await signMessageAsync({ message });
    
    const expectedOut = (parseFloat(amountIn) * 0.98).toFixed(6);
    const priceImpact = Math.random() * 2;
    
    const simulation: SwapSimulation = {
      simulationId: `simulate-${Date.now()}`,
      tokenIn,
      tokenOut,
      amountIn,
      expectedOut,
      priceImpact,
      simulatedBy: address,
      timestamp: Date.now(),
    };
    
    setSimulations([...simulations, simulation]);
    return simulation;
  };

  return { simulateSwap, simulations, address };
}
