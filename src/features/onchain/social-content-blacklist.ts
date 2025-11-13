'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BlacklistEntry {
  id: string;
  contentId: string;
  address: string;
  addedBy: string;
  reason: string;
  timestamp: number;
  active: boolean;
}

export function useSocialContentBlacklist() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [blacklist, setBlacklist] = useState<BlacklistEntry[]>([]);

  const addToBlacklist = async (
    contentId: string,
    blacklistAddress: string,
    reason: string
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Add to Blacklist: ${contentId} ${blacklistAddress} ${reason}`;
    await signMessageAsync({ message });
    
    const entry: BlacklistEntry = {
      id: `blacklist-${Date.now()}`,
      contentId,
      address: blacklistAddress,
      addedBy: address,
      reason,
      timestamp: Date.now(),
      active: true,
    };
    
    setBlacklist([...blacklist, entry]);
    return entry;
  };

  const removeFromBlacklist = async (contentId: string, blacklistAddress: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Remove from Blacklist: ${contentId} ${blacklistAddress}`;
    await signMessageAsync({ message });
    
    setBlacklist(blacklist.map(entry => 
      entry.contentId === contentId && entry.address === blacklistAddress
        ? { ...entry, active: false }
        : entry
    ));
  };

  return { addToBlacklist, removeFromBlacklist, blacklist, address };
}

