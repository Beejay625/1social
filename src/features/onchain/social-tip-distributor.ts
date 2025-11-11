'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TipDistribution {
  id: string;
  recipient: string;
  amount: string;
  token: string;
  postId: string;
  timestamp: number;
}

export function useSocialTipDistributor() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [tips, setTips] = useState<TipDistribution[]>([]);

  const distributeTip = async (recipient: string, amount: string, token: string, postId: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Distribute Tip: ${amount} ${token} to ${recipient} for ${postId}`;
    await signMessageAsync({ message });
    
    const tip: TipDistribution = {
      id: `tip-${Date.now()}`,
      recipient,
      amount,
      token,
      postId,
      timestamp: Date.now(),
    };
    
    setTips([...tips, tip]);
    return tip;
  };

  return { distributeTip, tips, address };
}

