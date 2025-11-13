'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RentalPayment {
  rentalId: string;
  tokenId: string;
  collectionAddress: string;
  amount: string;
  currency: string;
  payer: string;
  recipient: string;
  txHash: string;
  timestamp: number;
}

export function useNFTRentalPaymentProcessor() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [payments, setPayments] = useState<RentalPayment[]>([]);

  const processPayment = async (
    rentalId: string,
    tokenId: string,
    collectionAddress: string,
    amount: string,
    currency: string,
    recipient: string
  ): Promise<RentalPayment> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Process rental payment: ${rentalId} ${amount} ${currency}`;
    await signMessageAsync({ message });
    
    const payment: RentalPayment = {
      rentalId,
      tokenId,
      collectionAddress,
      amount,
      currency,
      payer: address,
      recipient,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setPayments([...payments, payment]);
    return payment;
  };

  return { processPayment, payments, address };
}

