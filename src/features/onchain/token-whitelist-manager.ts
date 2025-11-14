'use client';

/**
 * Token Whitelist Manager
 * Manage token whitelists with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface WhitelistEntry {
  entryId: string;
  tokenAddress: string;
  address: string;
  added: boolean;
  managedBy: string;
  timestamp: number;
}

export function useTokenWhitelistManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [entries, setEntries] = useState<WhitelistEntry[]>([]);

  const addToWhitelist = async (
    tokenAddress: string,
    addressToAdd: string
  ): Promise<WhitelistEntry> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x') || !addressToAdd.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    
    const message = `Add to whitelist: ${tokenAddress} address ${addressToAdd}`;
    await signMessageAsync({ message });
    
    const entry: WhitelistEntry = {
      entryId: `whitelist-${Date.now()}`,
      tokenAddress,
      address: addressToAdd,
      added: true,
      managedBy: address,
      timestamp: Date.now(),
    };
    
    setEntries([...entries, entry]);
    return entry;
  };

  return { addToWhitelist, entries, address };
}
