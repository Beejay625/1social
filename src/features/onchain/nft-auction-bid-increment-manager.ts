'use client';

/**
 * NFT Auction Bid Increment Manager
 * Manage bid increments for NFT auctions with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface BidIncrementManagement {
  managementId: string;
  auctionId: string;
  bidIncrement: string;
  action: 'set' | 'update' | 'remove';
  managedBy: string;
  timestamp: number;
}

export function useNFTAuctionBidIncrementManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [managements, setManagements] = useState<BidIncrementManagement[]>([]);

  const manageBidIncrement = async (
    auctionId: string,
    bidIncrement: string,
    action: 'set' | 'update' | 'remove'
  ): Promise<BidIncrementManagement> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!auctionId || auctionId.trim() === '') {
      throw new Error('Auction ID is required');
    }
    if (action !== 'remove' && parseFloat(bidIncrement) <= 0) {
      throw new Error('Bid increment must be greater than zero');
    }
    
    const message = `Manage bid increment: ${auctionId} ${action} ${bidIncrement}`;
    await signMessageAsync({ message });
    
    const management: BidIncrementManagement = {
      managementId: `increment-${Date.now()}`,
      auctionId,
      bidIncrement,
      action,
      managedBy: address,
      timestamp: Date.now(),
    };
    
    setManagements([...managements, management]);
    return management;
  };

  return { manageBidIncrement, managements, address };
}


