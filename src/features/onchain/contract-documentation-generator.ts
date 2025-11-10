'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Documentation {
  contract: string;
  abi: any[];
  docs: string;
  wallet: string;
  timestamp: number;
}

export function useContractDocumentationGenerator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [docs, setDocs] = useState<Documentation[]>([]);

  const generateDocs = async (contract: string, abi: any[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Generate Docs: ${contract}`;
    await signMessageAsync({ message });
    
    const documentation: Documentation = {
      contract,
      abi,
      docs: `Documentation for ${contract}`,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setDocs([...docs, documentation]);
    return documentation;
  };

  return { generateDocs, docs, address };
}

