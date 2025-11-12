'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TokenSwap {
  id: string;
  swapper: string;
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  amountOut: string;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
}

export function useSocialTokenSwaps() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [swaps, setSwaps] = useState<TokenSwap[]>([]);

  const swapTokens = async (
    tokenIn: string,
    tokenOut: string,
    amountIn: string,
    amountOut: string
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Swap Tokens: ${tokenIn} to ${tokenOut} ${amountIn} for ${amountOut}`;
    await signMessageAsync({ message });
    
    const swap: TokenSwap = {
      id: `swap-${Date.now()}`,
      swapper: address,
      tokenIn,
      tokenOut,
      amountIn,
      amountOut,
      timestamp: Date.now(),
      status: 'pending',
    };
    
    setSwaps([...swaps, swap]);
    return swap;
  };

  return { swapTokens, swaps, address };
}

