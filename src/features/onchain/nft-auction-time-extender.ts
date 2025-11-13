'use client';

/**
 * NFT Auction Time Extender
 * Extend auction end times with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface AuctionExtension {
  extensionId: string;
  auctionId: string;
  tokenId: string;
  originalEndTime: number;
  newEndTime: number;
  extensionPeriod: number;
  timestamp: number;
}

export function useNFTAuctionTimeExtender() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [extensions, setExtensions] = useState<AuctionExtension[]>([]);

  const extendAuction = async (
    auctionId: string,
    tokenId: string,
    originalEndTime: number,
    extensionPeriod: number
  ): Promise<AuctionExtension> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (extensionPeriod <= 0) {
      throw new Error('Extension period must be greater than zero');
    }
    
    const message = `Extend auction: ${auctionId} by ${extensionPeriod}ms`;
    await signMessageAsync({ message });
    
    const extension: AuctionExtension = {
      extensionId: `extend-${Date.now()}`,
      auctionId,
      tokenId,
      originalEndTime,
      newEndTime: originalEndTime + extensionPeriod,
      extensionPeriod,
      timestamp: Date.now(),
    };
    
    setExtensions([...extensions, extension]);
    return extension;
  };

  return { extendAuction, extensions, address };
}
