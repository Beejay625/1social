'use client';

/**
 * Token Whitelist Manager
 * Manage token whitelists with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface WhitelistEntry {
  address: string;
  addedBy: string;
  timestamp: number;
}

export interface TokenWhitelist {
  whitelistId: string;
  tokenAddress: string;
  addresses: WhitelistEntry[];
  active: boolean;
  createdBy: string;
  timestamp: number;
}

export function useTokenWhitelistManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [whitelists, setWhitelists] = useState<TokenWhitelist[]>([]);

  const createWhitelist = async (tokenAddress: string, addresses: string[]): Promise<TokenWhitelist> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x')) {
      throw new Error('Invalid token address format');
    }
    if (addresses.some(addr => !addr.startsWith('0x'))) {
      throw new Error('All addresses must be valid Ethereum addresses');
    }
    
    const message = `Create whitelist: ${tokenAddress} with ${addresses.length} addresses`;
    await signMessageAsync({ message });
    
    const entries: WhitelistEntry[] = addresses.map(addr => ({
      address: addr,
      addedBy: address,
      timestamp: Date.now(),
    }));
    
    const whitelist: TokenWhitelist = {
      whitelistId: `whitelist-${Date.now()}`,
      tokenAddress,
      addresses: entries,
      active: true,
      createdBy: address,
      timestamp: Date.now(),
    };
    
    setWhitelists([...whitelists, whitelist]);
    return whitelist;
  };

  return { createWhitelist, whitelists, address };
}
