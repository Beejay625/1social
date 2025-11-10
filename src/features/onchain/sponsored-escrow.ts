'use client';

import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { useState } from 'react';

export interface EscrowPost {
  postId: string;
  sponsor: string;
  amount: string;
  kpiTarget: number;
  status: 'locked' | 'released' | 'refunded';
}

export function useSponsoredPostEscrow() {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [escrows, setEscrows] = useState<EscrowPost[]>([]);

  const createEscrow = async (postId: string, amount: string, kpi: number) => {
    if (!address) throw new Error('Wallet not connected');
    
    const escrow: EscrowPost = {
      postId,
      sponsor: address,
      amount,
      kpiTarget: kpi,
      status: 'locked',
    };
    
    setEscrows([...escrows, escrow]);
    return escrow;
  };

  return { createEscrow, escrows };
}

