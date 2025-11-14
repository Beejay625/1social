'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface BondingCurve {
  id: string;
  token: string;
  reserve: bigint;
  supply: bigint;
  price: bigint;
}

export function useTokenBondingCurves() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [curves, setCurves] = useState<BondingCurve[]>([]);

  const buyTokens = async (token: string, amount: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: token as `0x${string}`,
      abi: [],
      functionName: 'buy',
      args: [BigInt(amount)],
    });

    const curve: BondingCurve = {
      id: txHash || '',
      token,
      reserve: BigInt(amount),
      supply: BigInt(0),
      price: BigInt(0),
    };

    setCurves([...curves, curve]);
    return txHash;
  };

  return { buyTokens, curves, address };
}


