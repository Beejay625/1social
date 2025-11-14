'use client';

/**
 * NFT Rental Payment Processor
 * Process rental payments for NFT rentals with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface RentalPayment {
  paymentId: string;
  rentalId: string;
  tokenId: string;
  amount: string;
  processedBy: string;
  timestamp: number;
}

export function useNFTRentalPaymentProcessor() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [payments, setPayments] = useState<RentalPayment[]>([]);

  const processPayment = async (
    rentalId: string,
    tokenId: string,
    amount: string
  ): Promise<RentalPayment> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Process rental payment: ${rentalId} token ${tokenId} amount ${amount}`;
    await signMessageAsync({ message });
    
    const payment: RentalPayment = {
      paymentId: `payment-${Date.now()}`,
      rentalId,
      tokenId,
      amount,
      processedBy: address,
      timestamp: Date.now(),
    };
    
    setPayments([...payments, payment]);
    return payment;
  };

  return { processPayment, payments, address };
}
