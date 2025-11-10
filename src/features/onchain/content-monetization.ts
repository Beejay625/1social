'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Monetization {
  contentId: string;
  model: 'paywall' | 'tips' | 'subscription';
  price: string;
  revenue: string;
  wallet: string;
}

export function useContentMonetization() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [monetizations, setMonetizations] = useState<Monetization[]>([]);

  const enableMonetization = async (contentId: string, model: 'paywall' | 'tips' | 'subscription', price: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Monetize: ${contentId} ${model} ${price}`;
    await signMessageAsync({ message });
    
    const monetization: Monetization = {
      contentId,
      model,
      price,
      revenue: '0',
      wallet: address,
    };
    
    setMonetizations([...monetizations, monetization]);
    return monetization;
  };

  return { enableMonetization, monetizations, address };
}

