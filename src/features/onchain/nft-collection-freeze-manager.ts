'use client';

/**
 * NFT Collection Freeze Manager
 * Freeze and unfreeze NFT collections with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface FreezeStatus {
  collectionAddress: string;
  isFrozen: boolean;
  frozenBy: string;
  timestamp: number;
}

export function useNFTCollectionFreezeManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [freezeStatuses, setFreezeStatuses] = useState<FreezeStatus[]>([]);

  const freeze = async (collectionAddress: string): Promise<FreezeStatus> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    
    const message = `Freeze collection: ${collectionAddress}`;
    await signMessageAsync({ message });
    
    const status: FreezeStatus = {
      collectionAddress,
      isFrozen: true,
      frozenBy: address,
      timestamp: Date.now(),
    };
    
    setFreezeStatuses([...freezeStatuses, status]);
    return status;
  };

  const unfreeze = async (collectionAddress: string): Promise<FreezeStatus> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Unfreeze collection: ${collectionAddress}`;
    await signMessageAsync({ message });
    
    const status: FreezeStatus = {
      collectionAddress,
      isFrozen: false,
      frozenBy: address,
      timestamp: Date.now(),
    };
    
    setFreezeStatuses([...freezeStatuses, status]);
    return status;
  };

  return { freeze, unfreeze, freezeStatuses, address };
}
