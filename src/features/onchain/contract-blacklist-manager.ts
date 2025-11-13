'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Blacklist {
  contract: string;
  address: string;
  blocked: boolean;
  wallet: string;
  timestamp: number;
}

export function useContractBlacklistManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [blacklists, setBlacklists] = useState<Blacklist[]>([]);

  const addToBlacklist = async (contract: string, addr: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Add to Blacklist: ${addr} on ${contract}`;
    await signMessageAsync({ message });
    
    const blacklist: Blacklist = {
      contract,
      address: addr,
      blocked: true,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setBlacklists([...blacklists, blacklist]);
    return blacklist;
  };

  return { addToBlacklist, blacklists, address };
}

