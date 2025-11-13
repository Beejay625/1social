'use client';

/**
 * NFT Fractional Share Manager
 * Manage fractional NFT shares with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface FractionalShare {
  shareId: string;
  tokenId: string;
  collectionAddress: string;
  totalShares: number;
  sharePrice: string;
  owner: string;
  sharesOwned: number;
  timestamp: number;
}

export function useNFTFractionalShareManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [shares, setShares] = useState<FractionalShare[]>([]);

  const createFractional = async (
    tokenId: string,
    collectionAddress: string,
    totalShares: number,
    sharePrice: string
  ): Promise<FractionalShare> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (totalShares <= 0) {
      throw new Error('Total shares must be greater than zero');
    }
    
    const message = `Create fractional: ${collectionAddress} #${tokenId} into ${totalShares} shares`;
    await signMessageAsync({ message });
    
    const share: FractionalShare = {
      shareId: `share-${Date.now()}`,
      tokenId,
      collectionAddress,
      totalShares,
      sharePrice,
      owner: address,
      sharesOwned: totalShares,
      timestamp: Date.now(),
    };
    
    setShares([...shares, share]);
    return share;
  };

  return { createFractional, shares, address };
}

