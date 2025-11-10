'use client';

import { useAccount } from 'wagmi';
import { useState } from 'react';

export interface Tip {
  from: string;
  to: string;
  amount: string;
  token: string;
  timestamp: number;
}

export function useTipCollector() {
  const { address } = useAccount();
  const [tips, setTips] = useState<Tip[]>([]);

  const collectTip = async (to: string, amount: string, token: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const tip: Tip = {
      from: address,
      to,
      amount,
      token,
      timestamp: Date.now(),
    };
    
    setTips([...tips, tip]);
    return tip;
  };

  return { collectTip, tips, address };
}
