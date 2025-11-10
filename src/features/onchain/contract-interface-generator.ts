'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Interface {
  contract: string;
  functions: string[];
  events: string[];
  wallet: string;
  timestamp: number;
}

export function useContractInterfaceGenerator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [interfaces, setInterfaces] = useState<Interface[]>([]);

  const generateInterface = async (contract: string, functions: string[], events: string[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Generate Interface: ${contract}`;
    await signMessageAsync({ message });
    
    const interfaceData: Interface = {
      contract,
      functions,
      events,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setInterfaces([...interfaces, interfaceData]);
    return interfaceData;
  };

  return { generateInterface, interfaces, address };
}

