'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface PayPerView {
  contentId: string;
  price: string;
  viewer: string;
  paid: boolean;
  wallet: string;
}

export function usePayPerView() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [payments, setPayments] = useState<PayPerView[]>([]);

  const purchaseAccess = async (contentId: string, price: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `PayPerView: ${contentId} ${price}`;
    await signMessageAsync({ message });
    
    const payment: PayPerView = {
      contentId,
      price,
      viewer: address,
      paid: true,
      wallet: address,
    };
    
    setPayments([...payments, payment]);
    return payment;
  };

  return { purchaseAccess, payments, address };
}

