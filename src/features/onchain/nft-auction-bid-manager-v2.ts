'use client';

/**
 * NFT Auction Bid Manager V2
 * Manage auction bids with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Bid {
  bidId: string;
  auctionId: string;
  tokenId: string;
  collectionAddress: string;
  bidAmount: string;
  bidder: string;
  timestamp: number;
}

export function useNFTAuctionBidManagerV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [bids, setBids] = useState<Bid[]>([]);

  const placeBid = async (
    auctionId: string,
    tokenId: string,
    collectionAddress: string,
    bidAmount: string
  ): Promise<Bid> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (parseFloat(bidAmount) <= 0) {
      throw new Error('Bid amount must be greater than zero');
    }
    
    const message = `Place bid: Auction ${auctionId} amount ${bidAmount}`;
    await signMessageAsync({ message });
    
    const bid: Bid = {
      bidId: `bid-${Date.now()}`,
      auctionId,
      tokenId,
      collectionAddress,
      bidAmount,
      bidder: address,
      timestamp: Date.now(),
    };
    
    setBids([...bids, bid]);
    return bid;
  };

  return { placeBid, bids, address };
}

