'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ABIRecord {
  contract: string;
  abi: any[];
  version: string;
  wallet: string;
  timestamp: number;
}

export function useContractABIManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [abis, setAbis] = useState<ABIRecord[]>([]);

  const saveABI = async (contract: string, abi: any[], version: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Save ABI: ${contract} v${version}`;
    await signMessageAsync({ message });
    
    const record: ABIRecord = {
      contract,
      abi,
      version,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setAbis([...abis, record]);
    return record;
  };

  return { saveABI, abis, address };
}

