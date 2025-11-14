'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RentalPayment {
  rentalId: bigint;
  amount: bigint;
  recipient: string;
  duration: number;
}

export function useNFTRentalPaymentProcessorV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [processing, setProcessing] = useState(false);

  const { data: rentalData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getRental',
    args: [0n],
    query: { enabled: isConnected },
  });

  const processPayment = async (payment: RentalPayment) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setProcessing(true);

    try {
      const message = `Process rental payment: ${payment.rentalId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'processRentalPayment',
        args: [payment.rentalId, payment.amount, payment.recipient],
      });
    } finally {
      setProcessing(false);
    }
  };

  return {
    processPayment,
    processing,
    address,
    isConnected,
    rentalData,
  };
}

