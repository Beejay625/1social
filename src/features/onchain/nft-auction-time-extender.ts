'use client';

import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

export interface AuctionExtension {
  auctionId: string;
  originalEndTime: number;
  newEndTime: number;
  extensionMinutes: number;
}

export function useNFTAuctionTimeExtender() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [extensions, setExtensions] = useState<AuctionExtension[]>([]);

  const extendAuction = async (auctionId: string, extensionMinutes: number) => {
    if (!address || !isConnected) throw new Error('Reown wallet not connected');
    
    const originalEndTime = Date.now();
    const newEndTime = originalEndTime + (extensionMinutes * 60 * 1000);
    
    const message = `Extend auction ${auctionId} by ${extensionMinutes} minutes`;
    await signMessageAsync({ message });
    
    const extension: AuctionExtension = {
      auctionId,
      originalEndTime,
      newEndTime,
      extensionMinutes,
    };
    
    setExtensions([...extensions, extension]);
    return extension;
  };

  return { 
    extendAuction, 
    extensions, 
    address, 
    isConnected,
    hash,
    isPending,
    isConfirming,
    isConfirmed
  };
}

