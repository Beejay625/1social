'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface LiquidStake {
  id: string;
  amount: bigint;
  receiptToken: string;
  apy: number;
  stakedAt: number;
}

export function useLiquidStaking() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [stakes, setStakes] = useState<LiquidStake[]>([]);

  const stakeLiquid = async (amount: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'stake',
      args: [BigInt(amount)],
    });

    const stake: LiquidStake = {
      id: txHash || '',
      amount: BigInt(amount),
      receiptToken: `stETH_${Date.now()}`,
      apy: 4.5,
      stakedAt: Date.now(),
    };

    setStakes([...stakes, stake]);
    return txHash;
  };

  return { stakeLiquid, stakes, address };
}


