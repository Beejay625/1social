'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ContractConfig {
  contract: string;
  key: string;
  value: any;
  wallet: string;
  timestamp: number;
}

export function useContractConfigManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [configs, setConfigs] = useState<ContractConfig[]>([]);

  const setConfig = async (contract: string, key: string, value: any) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Set Config: ${contract}.${key} = ${value}`;
    await signMessageAsync({ message });
    
    const config: ContractConfig = {
      contract,
      key,
      value,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setConfigs([...configs, config]);
    return config;
  };

  return { setConfig, configs, address };
}


