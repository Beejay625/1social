'use client';

/**
 * NFT Owner History Tracker
 * Track NFT ownership history with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface OwnershipRecord {
  recordId: string;
  tokenId: string;
  collectionAddress: string;
  owner: string;
  previousOwner: string;
  transferredBy: string;
  timestamp: number;
}

export function useNFTOwnerHistoryTracker() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [records, setRecords] = useState<OwnershipRecord[]>([]);

  const trackOwnership = async (
    tokenId: string,
    collectionAddress: string,
    owner: string,
    previousOwner: string
  ): Promise<OwnershipRecord> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x') || !owner.startsWith('0x') || !previousOwner.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    
    const message = `Track ownership: ${tokenId} in ${collectionAddress} from ${previousOwner} to ${owner}`;
    await signMessageAsync({ message });
    
    const record: OwnershipRecord = {
      recordId: `ownership-${Date.now()}`,
      tokenId,
      collectionAddress,
      owner,
      previousOwner,
      transferredBy: address,
      timestamp: Date.now(),
    };
    
    setRecords([...records, record]);
    return record;
  };

  return { trackOwnership, records, address };
}
