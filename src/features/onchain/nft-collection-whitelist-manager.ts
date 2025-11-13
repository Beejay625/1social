'use client';

/**
 * NFT Collection Whitelist Manager
 * Manage whitelist addresses for NFT collections with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface WhitelistEntry {
  collectionAddress: string;
  addresses: string[];
  addedBy: string;
  timestamp: number;
}

export function useNFTCollectionWhitelistManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [whitelists, setWhitelists] = useState<WhitelistEntry[]>([]);

  const addToWhitelist = async (
    collectionAddress: string,
    addresses: string[]
  ): Promise<WhitelistEntry> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (addresses.some(addr => !addr.startsWith('0x'))) {
      throw new Error('All addresses must be valid Ethereum addresses');
    }
    
    const message = `Add to whitelist: ${collectionAddress} ${addresses.length} addresses`;
    await signMessageAsync({ message });
    
    const entry: WhitelistEntry = {
      collectionAddress,
      addresses,
      addedBy: address,
      timestamp: Date.now(),
    };
    
    setWhitelists([...whitelists, entry]);
    return entry;
  };

  return { addToWhitelist, whitelists, address };
}

