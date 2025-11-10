'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface RebalanceAction {
  id: string;
  token: string;
  action: 'buy' | 'sell';
  amount: bigint;
  targetAllocation: number;
}

export function usePortfolioRebalancer() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [actions, setActions] = useState<RebalanceAction[]>([]);

  const rebalance = async (token: string, action: 'buy' | 'sell', amount: string, targetAllocation: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: token as `0x${string}`,
      abi: [],
      functionName: 'rebalance',
      args: [action, BigInt(amount), targetAllocation * 100],
    });

    const rebalanceAction: RebalanceAction = {
      id: txHash || '',
      token,
      action,
      amount: BigInt(amount),
      targetAllocation,
    };

    setActions([...actions, rebalanceAction]);
    return txHash;
  };

  return { rebalance, actions, address };
}
