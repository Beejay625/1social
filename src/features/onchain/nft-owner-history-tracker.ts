'use client';

/**
 * NFT Owner History Tracker
 * Track NFT ownership history with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface OwnershipRecord {
  tokenId: string;
  collectionAddress: string;
  owner: string;
  previousOwner: string;
  transferTime: number;
  txHash: string;
}

export function useNFTOwnerHistoryTracker() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [records, setRecords] = useState<OwnershipRecord[]>([]);

  const trackTransfer = async (
    tokenId: string,
    collectionAddress: string,
    owner: string,
    previousOwner: string,
    txHash: string
  ): Promise<OwnershipRecord> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x') || !owner.startsWith('0x') || !previousOwner.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    
    const message = `Track ownership: ${collectionAddress} #${tokenId}`;
    await signMessageAsync({ message });
    
    const record: OwnershipRecord = {
      tokenId,
      collectionAddress,
      owner,
      previousOwner,
      transferTime: Date.now(),
      txHash,
    };
    
    setRecords([...records, record]);
    return record;
  };

  return { trackTransfer, records, address };
}

