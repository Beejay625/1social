'use client';

/**
 * NFT Auction Time Extender V2
 * Extend auction time with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface TimeExtension {
  extensionId: string;
  auctionId: string;
  newEndTime: number;
  extendedBy: string;
  timestamp: number;
}

export function useNFTAuctionTimeExtenderV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [extensions, setExtensions] = useState<TimeExtension[]>([]);

  const extendAuctionTime = async (
    auctionId: string,
    newEndTime: number
  ): Promise<TimeExtension> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (newEndTime <= Date.now()) {
      throw new Error('New end time must be in the future');
    }
    
    const message = `Extend auction time V2: ${auctionId} to ${newEndTime}`;
    await signMessageAsync({ message });
    
    const extension: TimeExtension = {
      extensionId: `extend-v2-${Date.now()}`,
      auctionId,
      newEndTime,
      extendedBy: address,
      timestamp: Date.now(),
    };
    
    setExtensions([...extensions, extension]);
    return extension;
  };

  return { extendAuctionTime, extensions, address };
}
