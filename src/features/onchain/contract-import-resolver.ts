'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ImportResolution {
  contract: string;
  imports: string[];
  resolved: boolean;
  wallet: string;
  timestamp: number;
}

export function useContractImportResolver() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [resolutions, setResolutions] = useState<ImportResolution[]>([]);

  const resolveImports = async (contract: string, imports: string[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Resolve Imports: ${contract}`;
    await signMessageAsync({ message });
    
    const resolution: ImportResolution = {
      contract,
      imports,
      resolved: true,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setResolutions([...resolutions, resolution]);
    return resolution;
  };

  return { resolveImports, resolutions, address };
}

