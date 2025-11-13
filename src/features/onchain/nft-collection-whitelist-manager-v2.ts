'use client';

import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

export interface WhitelistEntry {
  address: string;
  maxMints: number;
  price: string;
}

export interface Whitelist {
  collectionAddress: string;
  entries: WhitelistEntry[];
  whitelistId: string;
  active: boolean;
}

export function useNFTCollectionWhitelistManagerV2() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [whitelists, setWhitelists] = useState<Whitelist[]>([]);

  const createWhitelist = async (collectionAddress: string, entries: WhitelistEntry[]) => {
    if (!address || !isConnected) throw new Error('Reown wallet not connected');
    
    const message = `Create whitelist for ${collectionAddress} with ${entries.length} entries`;
    await signMessageAsync({ message });
    
    const whitelist: Whitelist = {
      collectionAddress,
      entries,
      whitelistId: `whitelist_${Date.now()}`,
      active: true,
    };
    
    setWhitelists([...whitelists, whitelist]);
    return whitelist;
  };

  const toggleWhitelist = (whitelistId: string) => {
    setWhitelists(whitelists.map(w => w.whitelistId === whitelistId ? { ...w, active: !w.active } : w));
  };

  return { 
    createWhitelist, 
    toggleWhitelist,
    whitelists, 
    address, 
    isConnected,
    hash,
    isPending,
    isConfirming,
    isConfirmed
  };
}

