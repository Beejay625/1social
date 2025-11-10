'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Escrow {
  id: string;
  sponsor: string;
  creator: string;
  amount: string;
  released: boolean;
}

export function useSponsoredEscrow() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [escrows, setEscrows] = useState<Escrow[]>([]);

  const createEscrow = async (creator: string, amount: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Escrow: ${creator} ${amount}`;
    await signMessageAsync({ message });
    
    const escrow: Escrow = {
      id: `escrow_${Date.now()}`,
      sponsor: address,
      creator,
      amount,
      released: false,
    };
    
    setEscrows([...escrows, escrow]);
    return escrow;
  };

  return { createEscrow, escrows, address };
}
