'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface FlashLoan {
  id: string;
  asset: string;
  amount: bigint;
  fee: bigint;
  repaid: boolean;
}

export function useFlashLoan() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [loans, setLoans] = useState<FlashLoan[]>([]);

  const requestFlashLoan = async (asset: string, amount: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'flashLoan',
      args: [asset, BigInt(amount)],
    });

    const loan: FlashLoan = {
      id: txHash || '',
      asset,
      amount: BigInt(amount),
      fee: BigInt(0),
      repaid: false,
    };

    setLoans([...loans, loan]);
    return txHash;
  };

  return { requestFlashLoan, loans, address };
}


