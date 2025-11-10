'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface Rebalance {
  id: string;
  tokens: string[];
  targetWeights: number[];
  currentWeights: number[];
  executed: boolean;
}

export function usePortfolioRebalancer() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [rebalances, setRebalances] = useState<Rebalance[]>([]);

  const rebalancePortfolio = async (tokens: string[], targetWeights: number[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'rebalance',
      args: [tokens, targetWeights.map(w => w * 100)],
    });

    const rebalance: Rebalance = {
      id: txHash || '',
      tokens,
      targetWeights,
      currentWeights: [],
      executed: true,
    };

    setRebalances([...rebalances, rebalance]);
    return txHash;
  };

  return { rebalancePortfolio, rebalances, address };
}
