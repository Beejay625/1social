'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface WhitelistEntry {
  address: string;
  allowed: boolean;
  addedAt: number;
}

export function useNFTWhitelistManager() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [entries, setEntries] = useState<WhitelistEntry[]>([]);

  const addToWhitelist = async (collection: string, userAddress: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: collection as `0x${string}`,
      abi: [],
      functionName: 'addToWhitelist',
      args: [userAddress],
    });

    const entry: WhitelistEntry = {
      address: userAddress,
      allowed: true,
      addedAt: Date.now(),
    };

    setEntries([...entries, entry]);
    return txHash;
  };

  return { addToWhitelist, entries, address };
}

