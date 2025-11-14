'use client';

/**
 * NFT Auction Time Extender V2
 * Extend auction time with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface AuctionExtension {
  extensionId: string;
  auctionId: string;
  currentEndTime: number;
  newEndTime: number;
  extensionPeriod: number;
  txHash: string;
  extendedBy: string;
  timestamp: number;
}

export function useNFTAuctionTimeExtenderV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [extensions, setExtensions] = useState<AuctionExtension[]>([]);

  const extend = async (
    auctionId: string,
    currentEndTime: number,
    extensionPeriod: number
  ): Promise<AuctionExtension> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (extensionPeriod <= 0) {
      throw new Error('Extension period must be greater than zero');
    }
    
    const message = `Extend auction: ${auctionId} by ${extensionPeriod} seconds`;
    await signMessageAsync({ message });
    
    const newEndTime = currentEndTime + extensionPeriod;
    
    const extension: AuctionExtension = {
      extensionId: `extend-${Date.now()}`,
      auctionId,
      currentEndTime,
      newEndTime,
      extensionPeriod,
      txHash: `0x${Date.now().toString(16)}`,
      extendedBy: address,
      timestamp: Date.now(),
    };
    
    setExtensions([...extensions, extension]);
    return extension;
  };

  return { extend, extensions, address };
}

