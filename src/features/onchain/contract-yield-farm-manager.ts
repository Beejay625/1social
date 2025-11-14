'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface YieldFarm {
  farm: string;
  token: string;
  apy: number;
  staked: bigint;
  wallet: string;
  timestamp: number;
}

export function useContractYieldFarmManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [farms, setFarms] = useState<YieldFarm[]>([]);

  const createFarm = async (farm: string, token: string, apy: number, staked: bigint) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Create Yield Farm: ${farm} with ${apy}% APY`;
    await signMessageAsync({ message });
    
    const yieldFarm: YieldFarm = {
      farm,
      token,
      apy,
      staked,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setFarms([...farms, yieldFarm]);
    return yieldFarm;
  };

  return { createFarm, farms, address };
}


