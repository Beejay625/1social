'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Swap {
  fromToken: string;
  toToken: string;
  amount: string;
  rate: string;
  txHash: string;
  wallet: string;
}

export function useTokenSwapAggregator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [swaps, setSwaps] = useState<Swap[]>([]);

  const executeSwap = async (fromToken: string, toToken: string, amount: string, rate: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Swap: ${fromToken} -> ${toToken} ${amount} @ ${rate}`;
    await signMessageAsync({ message });
    
    const swap: Swap = {
      fromToken,
      toToken,
      amount,
      rate,
      txHash: `0x${Date.now().toString(16)}`,
      wallet: address,
    };
    
    setSwaps([...swaps, swap]);
    return swap;
  };

  return { executeSwap, swaps, address };
}

