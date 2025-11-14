'use client';

/**
 * NFT Collection Supply Manager
 * Manage collection max supply with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface SupplyUpdate {
  updateId: string;
  collectionAddress: string;
  newMaxSupply: number;
  updatedBy: string;
  timestamp: number;
}

export function useNFTCollectionSupplyManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [updates, setUpdates] = useState<SupplyUpdate[]>([]);

  const updateMaxSupply = async (
    collectionAddress: string,
    newMaxSupply: number
  ): Promise<SupplyUpdate> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (newMaxSupply <= 0) {
      throw new Error('Max supply must be greater than 0');
    }
    
    const message = `Update max supply: ${collectionAddress} to ${newMaxSupply}`;
    await signMessageAsync({ message });
    
    const update: SupplyUpdate = {
      updateId: `supply-${Date.now()}`,
      collectionAddress,
      newMaxSupply,
      updatedBy: address,
      timestamp: Date.now(),
    };
    
    setUpdates([...updates, update]);
    return update;
  };

  return { updateMaxSupply, updates, address };
}
