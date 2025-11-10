'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BurnTransaction {
  token: string;
  amount: string;
  reason: string;
  txHash: string;
  wallet: string;
}

export function useTokenBurn() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [burns, setBurns] = useState<BurnTransaction[]>([]);

  const burnTokens = async (token: string, amount: string, reason: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Burn: ${token} ${amount} ${reason}`;
    await signMessageAsync({ message });
    
    const burn: BurnTransaction = {
      token,
      amount,
      reason,
      txHash: `0x${Date.now().toString(16)}`,
      wallet: address,
    };
    
    setBurns([...burns, burn]);
    return burn;
  };

  return { burnTokens, burns, address };
}
