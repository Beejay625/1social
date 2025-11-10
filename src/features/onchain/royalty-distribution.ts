'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Royalty {
  contentId: string;
  recipient: string;
  percentage: number;
  amount: string;
  wallet: string;
}

export function useRoyaltyDistribution() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [royalties, setRoyalties] = useState<Royalty[]>([]);

  const distributeRoyalty = async (contentId: string, recipient: string, percentage: number, amount: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Royalty: ${contentId} ${recipient} ${percentage}% ${amount}`;
    await signMessageAsync({ message });
    
    const royalty: Royalty = {
      contentId,
      recipient,
      percentage,
      amount,
      wallet: address,
    };
    
    setRoyalties([...royalties, royalty]);
    return royalty;
  };

  return { distributeRoyalty, royalties, address };
}

