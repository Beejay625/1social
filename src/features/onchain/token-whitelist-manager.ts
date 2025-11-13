'use client';

/**
 * Token Whitelist Manager
 * Manage token whitelists with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface WhitelistEntry {
  tokenAddress: string;
  addresses: string[];
  addedBy: string;
  timestamp: number;
}

export function useTokenWhitelistManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [whitelists, setWhitelists] = useState<WhitelistEntry[]>([]);

  const addToWhitelist = async (
    tokenAddress: string,
    addresses: string[]
  ): Promise<WhitelistEntry> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    if (addresses.some(addr => !addr.startsWith('0x'))) {
      throw new Error('All addresses must be valid Ethereum addresses');
    }
    
    const message = `Add to whitelist: ${tokenAddress} ${addresses.length} addresses`;
    await signMessageAsync({ message });
    
    const entry: WhitelistEntry = {
      tokenAddress,
      addresses,
      addedBy: address,
      timestamp: Date.now(),
    };
    
    setWhitelists([...whitelists, entry]);
    return entry;
  };

  return { addToWhitelist, whitelists, address };
}
