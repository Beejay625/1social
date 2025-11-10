'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface Allowance {
  token: string;
  spender: string;
  amount: bigint;
  approved: boolean;
}

export function useTokenAllowanceManager() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [allowances, setAllowances] = useState<Allowance[]>([]);

  const approveAllowance = async (token: string, spender: string, amount: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: token as `0x${string}`,
      abi: [],
      functionName: 'approve',
      args: [spender, BigInt(amount)],
    });

    const allowance: Allowance = {
      token,
      spender,
      amount: BigInt(amount),
      approved: true,
    };

    setAllowances([...allowances, allowance]);
    return txHash;
  };

  return { approveAllowance, allowances, address };
}
