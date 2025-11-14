'use client';

/**
 * NFT Auction Time Extender V2
 * Extend auction time with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface AuctionExtension {
  extensionId: string;
  auctionId: string;
  tokenId: string;
  collectionAddress: string;
  originalEndTime: number;
  newEndTime: number;
  extensionPeriod: number;
  extendedBy: string;
  timestamp: number;
}

export function useNFTAuctionTimeExtenderV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [extensions, setExtensions] = useState<AuctionExtension[]>([]);

  const extendAuction = async (
    auctionId: string,
    tokenId: string,
    collectionAddress: string,
    extensionPeriod: number
  ): Promise<AuctionExtension> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (extensionPeriod <= 0) {
      throw new Error('Extension period must be greater than zero');
    }
    
    const message = `Extend auction V2: ${auctionId} extend ${extensionPeriod} seconds`;
    await signMessageAsync({ message });
    
    const originalEndTime = Date.now();
    const newEndTime = originalEndTime + (extensionPeriod * 1000);
    
    const extension: AuctionExtension = {
      extensionId: `extend-v2-${Date.now()}`,
      auctionId,
      tokenId,
      collectionAddress,
      originalEndTime,
      newEndTime,
      extensionPeriod,
      extendedBy: address,
      timestamp: Date.now(),
    };
    
    setExtensions([...extensions, extension]);
    return extension;
  };

  return { extendAuction, extensions, address };
}
