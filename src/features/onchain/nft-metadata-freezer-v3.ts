'use client';

/**
 * NFT Metadata Freezer V3
 * Freeze NFT metadata with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface MetadataFreeze {
  freezeId: string;
  tokenId: string;
  collectionAddress: string;
  frozen: boolean;
  reason?: string;
  frozenBy: string;
  timestamp: number;
}

export function useNFTMetadataFreezerV3() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [freezes, setFreezes] = useState<MetadataFreeze[]>([]);

  const freezeMetadata = async (
    tokenId: string,
    collectionAddress: string,
    reason?: string
  ): Promise<MetadataFreeze> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    
    const message = `Freeze metadata: ${collectionAddress} #${tokenId}${reason ? ` - ${reason}` : ''}`;
    await signMessageAsync({ message });
    
    const freeze: MetadataFreeze = {
      freezeId: `freeze-${Date.now()}`,
      tokenId,
      collectionAddress,
      frozen: true,
      reason,
      frozenBy: address,
      timestamp: Date.now(),
    };
    
    setFreezes([...freezes, freeze]);
    return freeze;
  };

  const unfreezeMetadata = async (
    tokenId: string,
    collectionAddress: string
  ): Promise<MetadataFreeze> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Unfreeze metadata: ${collectionAddress} #${tokenId}`;
    await signMessageAsync({ message });
    
    const freeze: MetadataFreeze = {
      freezeId: `unfreeze-${Date.now()}`,
      tokenId,
      collectionAddress,
      frozen: false,
      frozenBy: address,
      timestamp: Date.now(),
    };
    
    setFreezes([...freezes, freeze]);
    return freeze;
  };

  return { freezeMetadata, unfreezeMetadata, freezes, address };
}
