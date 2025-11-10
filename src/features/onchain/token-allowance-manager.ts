'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Allowance {
  token: string;
  spender: string;
  amount: string;
  wallet: string;
}

export function useTokenAllowanceManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [allowances, setAllowances] = useState<Allowance[]>([]);

  const setAllowance = async (token: string, spender: string, amount: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Set Allowance: ${token} to ${spender} ${amount}`;
    await signMessageAsync({ message });
    
    const allowance: Allowance = {
      token,
      spender,
      amount,
      wallet: address,
    };
    
    setAllowances([...allowances, allowance]);
    return allowance;
  };

  return { setAllowance, allowances, address };
}

