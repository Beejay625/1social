'use client';

/**
 * NFT Attribute Updater
 * Update NFT attributes with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface AttributeUpdate {
  updateId: string;
  tokenId: string;
  collectionAddress: string;
  attributes: Record<string, string>;
  updatedBy: string;
  timestamp: number;
}

export function useNFTAttributeUpdater() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [updates, setUpdates] = useState<AttributeUpdate[]>([]);

  const updateAttributes = async (
    tokenId: string,
    collectionAddress: string,
    attributes: Record<string, string>
  ): Promise<AttributeUpdate> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    
    const message = `Update attributes: ${tokenId} in ${collectionAddress}`;
    await signMessageAsync({ message });
    
    const update: AttributeUpdate = {
      updateId: `attribute-${Date.now()}`,
      tokenId,
      collectionAddress,
      attributes,
      updatedBy: address,
      timestamp: Date.now(),
    };
    
    setUpdates([...updates, update]);
    return update;
  };

  return { updateAttributes, updates, address };
}
