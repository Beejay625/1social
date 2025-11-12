'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TokenBurn {
  id: string;
  burner: string;
  tokenAddress: string;
  amount: string;
  reason: string;
  timestamp: number;
  transactionHash?: string;
}

export function useSocialTokenBurns() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [burns, setBurns] = useState<TokenBurn[]>([]);

  const burnTokens = async (
    tokenAddress: string,
    amount: string,
    reason: string
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Burn Tokens: ${tokenAddress} ${amount} ${reason}`;
    await signMessageAsync({ message });
    
    const burn: TokenBurn = {
      id: `burn-${Date.now()}`,
      burner: address,
      tokenAddress,
      amount,
      reason,
      timestamp: Date.now(),
      transactionHash: `0x${Date.now().toString(16)}`,
    };
    
    setBurns([...burns, burn]);
    return burn;
  };

  return { burnTokens, burns, address };
}

