'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface CollateralizedLoan {
  id: string;
  collateral: string;
  collateralAmount: bigint;
  loanAmount: bigint;
  interestRate: number;
  repaid: boolean;
}

export function useCollateralizedLoans() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [loans, setLoans] = useState<CollateralizedLoan[]>([]);

  const createLoan = async (collateral: string, collateralAmount: string, loanAmount: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'createLoan',
      args: [collateral, BigInt(collateralAmount), BigInt(loanAmount)],
    });

    const loan: CollateralizedLoan = {
      id: txHash || '',
      collateral,
      collateralAmount: BigInt(collateralAmount),
      loanAmount: BigInt(loanAmount),
      interestRate: 5.0,
      repaid: false,
    };

    setLoans([...loans, loan]);
    return txHash;
  };

  return { createLoan, loans, address };
}


