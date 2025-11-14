'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface PaymentSplit {
  rentalId: number;
  splits: Array<{
    recipient: string;
    percentage: number;
  }>;
}

export function useNFTRentalPaymentSplitter() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [splitting, setSplitting] = useState(false);

  const { data: rentalPayments } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getRentalPayments',
    args: [address],
  });

  const configurePaymentSplit = async (rentalAddress: string, split: PaymentSplit) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setSplitting(true);

    try {
      const totalPercentage = split.splits.reduce((sum, s) => sum + s.percentage, 0);
      if (totalPercentage !== 100) {
        throw new Error('Percentages must sum to 100');
      }

      const message = `Configure payment split for rental ${split.rentalId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: rentalAddress as `0x${string}`,
        abi: [],
        functionName: 'setPaymentSplit',
        args: [
          split.rentalId,
          split.splits.map(s => s.recipient),
          split.splits.map(s => s.percentage),
        ],
      });
    } finally {
      setSplitting(false);
    }
  };

  const distributePayments = async (rentalAddress: string, rentalId: number) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setSplitting(true);

    try {
      const message = `Distribute rental payments for ${rentalId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: rentalAddress as `0x${string}`,
        abi: [],
        functionName: 'distributePayments',
        args: [rentalId],
      });
    } finally {
      setSplitting(false);
    }
  };

  return {
    configurePaymentSplit,
    distributePayments,
    splitting,
    address,
    isConnected,
    rentalPayments,
  };
}

