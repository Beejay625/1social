'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Royalty {
  id: string;
  contentId: string;
  creator: string;
  recipient: string;
  percentage: number;
  amount: string;
  timestamp: number;
}

export function useSocialContentRoyalties() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [royalties, setRoyalties] = useState<Royalty[]>([]);

  const setRoyalty = async (
    contentId: string,
    recipient: string,
    percentage: number
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Set Royalty: ${contentId} ${recipient} ${percentage}%`;
    await signMessageAsync({ message });
    
    const royalty: Royalty = {
      id: `royalty-${Date.now()}`,
      contentId,
      creator: address,
      recipient,
      percentage,
      amount: '0',
      timestamp: Date.now(),
    };
    
    setRoyalties([...royalties, royalty]);
    return royalty;
  };

  return { setRoyalty, royalties, address };
}

