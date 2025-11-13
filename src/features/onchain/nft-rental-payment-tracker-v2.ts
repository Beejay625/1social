'use client';

import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

export interface RentalPayment {
  rentalId: string;
  tokenId: string;
  collectionAddress: string;
  renter: string;
  amount: string;
  dueDate: number;
  paid: boolean;
}

export function useNFTRentalPaymentTrackerV2() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [payments, setPayments] = useState<RentalPayment[]>([]);

  const trackPayment = async (rentalId: string, tokenId: string, collectionAddress: string, renter: string, amount: string, dueDate: number) => {
    if (!address || !isConnected) throw new Error('Reown wallet not connected');
    
    const message = `Track rental payment: ${rentalId} for token ${tokenId}`;
    await signMessageAsync({ message });
    
    const payment: RentalPayment = {
      rentalId,
      tokenId,
      collectionAddress,
      renter,
      amount,
      dueDate,
      paid: false,
    };
    
    setPayments([...payments, payment]);
    return payment;
  };

  const markPaid = (rentalId: string) => {
    setPayments(payments.map(p => p.rentalId === rentalId ? { ...p, paid: true } : p));
  };

  return { 
    trackPayment, 
    markPaid,
    payments, 
    address, 
    isConnected,
    hash,
    isPending,
    isConfirming,
    isConfirmed
  };
}

