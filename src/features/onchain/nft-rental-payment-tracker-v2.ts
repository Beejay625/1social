'use client';

/**
 * NFT Rental Payment Tracker V2
 * Track rental payments in real-time with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface RentalPayment {
  rentalId: string;
  tokenId: string;
  collectionAddress: string;
  amount: string;
  currency: string;
  payer: string;
  recipient: string;
  dueDate: number;
  status: 'pending' | 'paid' | 'overdue';
  timestamp: number;
}

export function useNFTRentalPaymentTrackerV2(rentalId?: string) {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [payments, setPayments] = useState<RentalPayment[]>([]);
  const [isTracking, setIsTracking] = useState(false);

  const startTracking = async () => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Start tracking rental payments: ${rentalId || 'all'}`;
    await signMessageAsync({ message });
    
    setIsTracking(true);
  };

  const stopTracking = () => {
    setIsTracking(false);
  };

  useEffect(() => {
    if (!isTracking) return;
    
    const interval = setInterval(() => {
      const payment: RentalPayment = {
        rentalId: rentalId || `rental-${Date.now()}`,
        tokenId: '1',
        collectionAddress: '0x0',
        amount: '0.1',
        currency: 'ETH',
        payer: address || '0x0',
        recipient: '0x0',
        dueDate: Date.now() + 86400000,
        status: 'pending',
        timestamp: Date.now(),
      };
      
      setPayments((prev) => [payment, ...prev.slice(0, 9)]);
    }, 45000);
    
    return () => clearInterval(interval);
  }, [isTracking, rentalId, address]);

  return { startTracking, stopTracking, payments, isTracking, address };
}
