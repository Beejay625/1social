'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TokenDistribution {
  id: string;
  recipient: string;
  amount: string;
  tokenAddress: string;
  reason: string;
  timestamp: number;
}

export function useSocialTokenDistributor() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [distributions, setDistributions] = useState<TokenDistribution[]>([]);

  const distributeTokens = async (recipient: string, amount: string, tokenAddress: string, reason: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Distribute Tokens: ${amount} to ${recipient} - ${reason}`;
    await signMessageAsync({ message });
    
    const distribution: TokenDistribution = {
      id: `dist-${Date.now()}`,
      recipient,
      amount,
      tokenAddress,
      reason,
      timestamp: Date.now(),
    };
    
    setDistributions([...distributions, distribution]);
    return distribution;
  };

  return { distributeTokens, distributions, address };
}

