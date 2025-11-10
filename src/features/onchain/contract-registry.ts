'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RegistryEntry {
  name: string;
  address: string;
  chainId: number;
  verified: boolean;
  wallet: string;
}

export function useContractRegistry() {
  const { address, chainId } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [entries, setEntries] = useState<RegistryEntry[]>([]);

  const registerContract = async (name: string, contractAddress: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Register: ${name} at ${contractAddress}`;
    await signMessageAsync({ message });
    
    const entry: RegistryEntry = {
      name,
      address: contractAddress,
      chainId: chainId || 1,
      verified: true,
      wallet: address,
    };
    
    setEntries([...entries, entry]);
    return entry;
  };

  return { registerContract, entries, address, chainId };
}

