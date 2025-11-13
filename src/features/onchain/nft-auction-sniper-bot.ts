'use client';

import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

export interface SnipeConfig {
  auctionId: string;
  tokenId: string;
  collectionAddress: string;
  maxBid: string;
  snipeAt: number;
  active: boolean;
}

export function useNFTAuctionSniperBot() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [snipeConfigs, setSnipeConfigs] = useState<SnipeConfig[]>([]);

  const createSnipe = async (auctionId: string, tokenId: string, collectionAddress: string, maxBid: string, snipeAt: number) => {
    if (!address || !isConnected) throw new Error('Reown wallet not connected');
    
    const message = `Create snipe config for auction ${auctionId} with max bid ${maxBid}`;
    await signMessageAsync({ message });
    
    const config: SnipeConfig = {
      auctionId,
      tokenId,
      collectionAddress,
      maxBid,
      snipeAt,
      active: true,
    };
    
    setSnipeConfigs([...snipeConfigs, config]);
    return config;
  };

  const toggleSnipe = (auctionId: string) => {
    setSnipeConfigs(snipeConfigs.map(c => c.auctionId === auctionId ? { ...c, active: !c.active } : c));
  };

  return { 
    createSnipe, 
    toggleSnipe,
    snipeConfigs, 
    address, 
    isConnected,
    hash,
    isPending,
    isConfirming,
    isConfirmed
  };
}

