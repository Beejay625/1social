'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Escrow {
  id: string;
  creator: string;
  contentId: string;
  buyer: string;
  amount: string;
  currency: string;
  releaseCondition: string;
  timestamp: number;
  status: 'pending' | 'released' | 'refunded' | 'disputed';
}

export function useSocialContentEscrow() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [escrows, setEscrows] = useState<Escrow[]>([]);

  const createEscrow = async (
    contentId: string,
    buyer: string,
    amount: string,
    currency: string,
    releaseCondition: string
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Create Escrow: ${contentId} ${buyer} ${amount} ${currency}`;
    await signMessageAsync({ message });
    
    const escrow: Escrow = {
      id: `escrow-${Date.now()}`,
      creator: address,
      contentId,
      buyer,
      amount,
      currency,
      releaseCondition,
      timestamp: Date.now(),
      status: 'pending',
    };
    
    setEscrows([...escrows, escrow]);
    return escrow;
  };

  return { createEscrow, escrows, address };
}

