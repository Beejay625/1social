'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Slippage {
  amount: bigint;
  expected: bigint;
  actual: bigint;
  slippage: number;
  wallet: string;
  timestamp: number;
}

export function useContractSlippageCalculator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [slippages, setSlippages] = useState<Slippage[]>([]);

  const calculateSlippage = async (amount: bigint, expected: bigint, actual: bigint) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Calculate Slippage: ${amount.toString()}`;
    await signMessageAsync({ message });
    
    const slippage: Slippage = {
      amount,
      expected,
      actual,
      slippage: Number(((expected - actual) * 10000n) / expected) / 100,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setSlippages([...slippages, slippage]);
    return slippage;
  };

  return { calculateSlippage, slippages, address };
}

