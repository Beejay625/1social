'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface FarmPosition {
  farm: string;
  token: string;
  amount: string;
  apy: number;
  wallet: string;
}

export function useYieldFarming() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [positions, setPositions] = useState<FarmPosition[]>([]);

  const stakeInFarm = async (farm: string, token: string, amount: string, apy: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Yield Farm: ${farm} ${token} ${amount} ${apy}% APY`;
    await signMessageAsync({ message });
    
    const position: FarmPosition = {
      farm,
      token,
      amount,
      apy,
      wallet: address,
    };
    
    setPositions([...positions, position]);
    return position;
  };

  return { stakeInFarm, positions, address };
}


