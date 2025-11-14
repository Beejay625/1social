'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface RefundRequest {
  id: string;
  txHash: string;
  amount: bigint;
  status: 'pending' | 'approved' | 'rejected';
}

export function useGasRefund() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [refunds, setRefunds] = useState<RefundRequest[]>([]);

  const requestRefund = async (txHash: string, amount: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHashRefund = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'requestRefund',
      args: [txHash, BigInt(amount)],
    });

    const refund: RefundRequest = {
      id: txHashRefund || '',
      txHash,
      amount: BigInt(amount),
      status: 'pending',
    };

    setRefunds([...refunds, refund]);
    return txHashRefund;
  };

  return { requestRefund, refunds, address };
}


