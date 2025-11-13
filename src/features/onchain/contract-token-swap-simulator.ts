'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TokenSwap {
  tokenIn: string;
  tokenOut: string;
  amountIn: bigint;
  amountOut: bigint;
  wallet: string;
  timestamp: number;
}

export function useContractTokenSwapSimulator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [swaps, setSwaps] = useState<TokenSwap[]>([]);

  const simulateSwap = async (tokenIn: string, tokenOut: string, amountIn: bigint, amountOut: bigint) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Simulate Swap: ${amountIn} ${tokenIn} for ${amountOut} ${tokenOut}`;
    await signMessageAsync({ message });
    
    const swap: TokenSwap = {
      tokenIn,
      tokenOut,
      amountIn,
      amountOut,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setSwaps([...swaps, swap]);
    return swap;
  };

  return { simulateSwap, swaps, address };
}

