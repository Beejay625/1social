'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface PriceImpact {
  amount: bigint;
  impact: number;
  priceBefore: bigint;
  priceAfter: bigint;
  wallet: string;
  timestamp: number;
}

export function useContractPriceImpact() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [impacts, setImpacts] = useState<PriceImpact[]>([]);

  const calculateImpact = async (amount: bigint, priceBefore: bigint, priceAfter: bigint) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Calculate Price Impact: ${amount.toString()}`;
    await signMessageAsync({ message });
    
    const impact: PriceImpact = {
      amount,
      impact: Number(((priceAfter - priceBefore) * 10000n) / priceBefore) / 100,
      priceBefore,
      priceAfter,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setImpacts([...impacts, impact]);
    return impact;
  };

  return { calculateImpact, impacts, address };
}

