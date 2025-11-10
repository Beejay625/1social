'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RebalanceAction {
  token: string;
  current: number;
  target: number;
  action: 'buy' | 'sell';
  wallet: string;
}

export function usePortfolioRebalancer() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [actions, setActions] = useState<RebalanceAction[]>([]);

  const rebalance = async (token: string, current: number, target: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Rebalance: ${token} ${current}% -> ${target}%`;
    await signMessageAsync({ message });
    
    const action: RebalanceAction = {
      token,
      current,
      target,
      action: target > current ? 'buy' : 'sell',
      wallet: address,
    };
    
    setActions([...actions, action]);
    return action;
  };

  return { rebalance, actions, address };
}

