'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface RevenueShare {
  id: string;
  participants: string[];
  shares: number[];
  totalRevenue: bigint;
}

export function useRevenueSharing() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [shares, setShares] = useState<RevenueShare[]>([]);

  const createRevenueShare = async (participants: string[], shares: number[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'createRevenueShare',
      args: [participants, shares],
    });

    const share: RevenueShare = {
      id: txHash || '',
      participants,
      shares,
      totalRevenue: BigInt(0),
    };

    setShares([...shares, share]);
    return txHash;
  };

  return { createRevenueShare, shares, address };
}


