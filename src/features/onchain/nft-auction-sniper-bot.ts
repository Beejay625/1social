'use client';

/**
 * NFT Auction Sniper Bot
 * Configure automated auction sniping with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SniperConfig {
  configId: string;
  auctionId: string;
  tokenId: string;
  maxBid: string;
  snipeTime: number;
  enabled: boolean;
  timestamp: number;
}

export function useNFTAuctionSniperBot() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [configs, setConfigs] = useState<SniperConfig[]>([]);

  const configureSnipe = async (
    auctionId: string,
    tokenId: string,
    maxBid: string,
    snipeTime: number
  ): Promise<SniperConfig> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (parseFloat(maxBid) <= 0) {
      throw new Error('Max bid must be greater than zero');
    }
    if (snipeTime <= Date.now()) {
      throw new Error('Snipe time must be in the future');
    }
    
    const message = `Configure snipe: Auction ${auctionId} max bid ${maxBid}`;
    await signMessageAsync({ message });
    
    const config: SniperConfig = {
      configId: `snipe-${Date.now()}`,
      auctionId,
      tokenId,
      maxBid,
      snipeTime,
      enabled: true,
      timestamp: Date.now(),
    };
    
    setConfigs([...configs, config]);
    return config;
  };

  return { configureSnipe, configs, address };
}
