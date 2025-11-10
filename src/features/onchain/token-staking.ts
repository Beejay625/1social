'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Stake {
  token: string;
  amount: string;
  lockPeriod: number;
  wallet: string;
}

export function useTokenStaking() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [stakes, setStakes] = useState<Stake[]>([]);

  const stakeToken = async (token: string, amount: string, lockPeriod: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Stake: ${token} ${amount} ${lockPeriod} days`;
    await signMessageAsync({ message });
    
    const stake: Stake = {
      token,
      amount,
      lockPeriod,
      wallet: address,
    };
    
    setStakes([...stakes, stake]);
    return stake;
  };

  return { stakeToken, stakes, address };
}
