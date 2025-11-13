'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Whitelist {
  contract: string;
  address: string;
  added: boolean;
  wallet: string;
  timestamp: number;
}

export function useContractWhitelistManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [whitelists, setWhitelists] = useState<Whitelist[]>([]);

  const addToWhitelist = async (contract: string, addr: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Add to Whitelist: ${addr} on ${contract}`;
    await signMessageAsync({ message });
    
    const whitelist: Whitelist = {
      contract,
      address: addr,
      added: true,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setWhitelists([...whitelists, whitelist]);
    return whitelist;
  };

  return { addToWhitelist, whitelists, address };
}

