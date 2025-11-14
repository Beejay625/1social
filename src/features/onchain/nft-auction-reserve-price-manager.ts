'use client';

/**
 * NFT Auction Reserve Price Manager
 * Manage reserve prices for NFT auctions with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface ReservePriceManagement {
  managementId: string;
  auctionId: string;
  reservePrice: string;
  action: 'set' | 'update' | 'remove';
  managedBy: string;
  timestamp: number;
}

export function useNFTAuctionReservePriceManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [managements, setManagements] = useState<ReservePriceManagement[]>([]);

  const manageReservePrice = async (
    auctionId: string,
    reservePrice: string,
    action: 'set' | 'update' | 'remove'
  ): Promise<ReservePriceManagement> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!auctionId || auctionId.trim() === '') {
      throw new Error('Auction ID is required');
    }
    if (action !== 'remove' && parseFloat(reservePrice) <= 0) {
      throw new Error('Reserve price must be greater than zero');
    }
    
    const message = `Manage reserve price: ${auctionId} ${action} ${reservePrice}`;
    await signMessageAsync({ message });
    
    const management: ReservePriceManagement = {
      managementId: `reserve-${Date.now()}`,
      auctionId,
      reservePrice,
      action,
      managedBy: address,
      timestamp: Date.now(),
    };
    
    setManagements([...managements, management]);
    return management;
  };

  return { manageReservePrice, managements, address };
}

