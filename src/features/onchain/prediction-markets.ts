'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface PredictionMarket {
  id: string;
  question: string;
  outcome: string | null;
  yesAmount: bigint;
  noAmount: bigint;
  resolved: boolean;
}

export function usePredictionMarkets() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [markets, setMarkets] = useState<PredictionMarket[]>([]);

  const createMarket = async (question: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'createMarket',
      args: [question],
    });

    const market: PredictionMarket = {
      id: txHash || '',
      question,
      outcome: null,
      yesAmount: BigInt(0),
      noAmount: BigInt(0),
      resolved: false,
    };

    setMarkets([...markets, market]);
    return txHash;
  };

  return { createMarket, markets, address };
}

