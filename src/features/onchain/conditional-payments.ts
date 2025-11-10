'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface ConditionalPayment {
  id: string;
  recipient: string;
  amount: bigint;
  condition: string;
  fulfilled: boolean;
}

export function useConditionalPayments() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [payments, setPayments] = useState<ConditionalPayment[]>([]);

  const createPayment = async (recipient: string, amount: string, condition: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'createPayment',
      args: [recipient, BigInt(amount), condition],
    });

    const payment: ConditionalPayment = {
      id: txHash || '',
      recipient,
      amount: BigInt(amount),
      condition,
      fulfilled: false,
    };

    setPayments([...payments, payment]);
    return txHash;
  };

  return { createPayment, payments, address };
}

