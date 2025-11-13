'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface WhitelistEntry {
  id: string;
  contentId: string;
  address: string;
  addedBy: string;
  timestamp: number;
  active: boolean;
}

export function useSocialContentWhitelist() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [whitelist, setWhitelist] = useState<WhitelistEntry[]>([]);

  const addToWhitelist = async (contentId: string, whitelistAddress: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Add to Whitelist: ${contentId} ${whitelistAddress}`;
    await signMessageAsync({ message });
    
    const entry: WhitelistEntry = {
      id: `whitelist-${Date.now()}`,
      contentId,
      address: whitelistAddress,
      addedBy: address,
      timestamp: Date.now(),
      active: true,
    };
    
    setWhitelist([...whitelist, entry]);
    return entry;
  };

  const removeFromWhitelist = async (contentId: string, whitelistAddress: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Remove from Whitelist: ${contentId} ${whitelistAddress}`;
    await signMessageAsync({ message });
    
    setWhitelist(whitelist.map(entry => 
      entry.contentId === contentId && entry.address === whitelistAddress
        ? { ...entry, active: false }
        : entry
    ));
  };

  return { addToWhitelist, removeFromWhitelist, whitelist, address };
}

