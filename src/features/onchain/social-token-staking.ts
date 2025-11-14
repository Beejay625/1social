'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TokenStake {
  id: string;
  staker: string;
  amount: string;
  tokenAddress: string;
  lockPeriod: number;
  timestamp: number;
  unlockedAt: number;
}

export function useSocialTokenStaking() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [stakes, setStakes] = useState<TokenStake[]>([]);

  const stakeTokens = async (amount: string, tokenAddress: string, lockPeriod: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Stake Tokens: ${amount} ${tokenAddress} for ${lockPeriod} days`;
    await signMessageAsync({ message });
    
    const stake: TokenStake = {
      id: `stake-${Date.now()}`,
      staker: address,
      amount,
      tokenAddress,
      lockPeriod,
      timestamp: Date.now(),
      unlockedAt: Date.now() + (lockPeriod * 24 * 60 * 60 * 1000),
    };
    
    setStakes([...stakes, stake]);
    return stake;
  };

  return { stakeTokens, stakes, address };
}


