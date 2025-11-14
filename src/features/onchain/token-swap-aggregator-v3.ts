'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SwapQuote {
  tokenIn: string;
  tokenOut: string;
  amountIn: bigint;
  amountOut: bigint;
  route: string[];
  priceImpact: number;
  gasEstimate: bigint;
}

export function useTokenSwapAggregatorV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [swapping, setSwapping] = useState(false);
  const [quote, setQuote] = useState<SwapQuote | null>(null);

  const { data: tokenBalance } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'balanceOf',
    args: [address],
  });

  const getQuote = async (tokenIn: string, tokenOut: string, amountIn: bigint) => {
    if (!address || !isConnected) return null;

    try {
      // Fetch best quote from aggregator
      const bestQuote: SwapQuote = {
        tokenIn,
        tokenOut,
        amountIn,
        amountOut: BigInt(0),
        route: [],
        priceImpact: 0,
        gasEstimate: BigInt(0),
      };
      setQuote(bestQuote);
      return bestQuote;
    } catch (error) {
      console.error('Error fetching quote:', error);
      return null;
    }
  };

  const executeSwap = async (quote: SwapQuote, slippage: number) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setSwapping(true);

    try {
      const message = `Swap ${quote.amountIn} ${quote.tokenIn} for ${quote.tokenOut}`;
      await signMessageAsync({ message });

      await writeContract({
        address: quote.route[0] as `0x${string}`,
        abi: [],
        functionName: 'swap',
        args: [quote.tokenIn, quote.tokenOut, quote.amountIn, quote.amountOut, quote.route],
      });
    } finally {
      setSwapping(false);
    }
  };

  return {
    getQuote,
    executeSwap,
    swapping,
    quote,
    address,
    isConnected,
    tokenBalance,
  };
}

