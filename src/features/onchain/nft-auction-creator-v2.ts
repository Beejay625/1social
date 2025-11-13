'use client';

/**
 * NFT Auction Creator V2
 * Create NFT auctions with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Auction {
  auctionId: string;
  tokenId: string;
  collectionAddress: string;
  startingPrice: string;
  reservePrice: string;
  currency: string;
  startTime: number;
  endTime: number;
  createdBy: string;
  timestamp: number;
}

export function useNFTAuctionCreatorV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [auctions, setAuctions] = useState<Auction[]>([]);

  const create = async (
    tokenId: string,
    collectionAddress: string,
    startingPrice: string,
    reservePrice: string,
    currency: string,
    startTime: number,
    endTime: number
  ): Promise<Auction> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (parseFloat(reservePrice) > parseFloat(startingPrice)) {
      throw new Error('Reserve price cannot be higher than starting price');
    }
    
    const message = `Create auction: ${collectionAddress} #${tokenId} starting ${startingPrice} ${currency}`;
    await signMessageAsync({ message });
    
    const auction: Auction = {
      auctionId: `auction-${Date.now()}`,
      tokenId,
      collectionAddress,
      startingPrice,
      reservePrice,
      currency,
      startTime,
      endTime,
      createdBy: address,
      timestamp: Date.now(),
    };
    
    setAuctions([...auctions, auction]);
    return auction;
  };

  return { create, auctions, address };
}

