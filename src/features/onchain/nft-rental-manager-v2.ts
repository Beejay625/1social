'use client';

/**
 * NFT Rental Manager V2
 * Manage NFT rentals with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Rental {
  rentalId: string;
  tokenId: string;
  collectionAddress: string;
  owner: string;
  renter: string;
  price: string;
  duration: number;
  startTime: number;
  endTime: number;
  active: boolean;
  timestamp: number;
}

export function useNFTRentalManagerV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [rentals, setRentals] = useState<Rental[]>([]);

  const createRental = async (
    tokenId: string,
    collectionAddress: string,
    renter: string,
    price: string,
    duration: number
  ): Promise<Rental> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x') || !renter.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    if (duration <= 0) {
      throw new Error('Duration must be greater than zero');
    }
    
    const message = `Create rental: ${collectionAddress} #${tokenId} to ${renter}`;
    await signMessageAsync({ message });
    
    const startTime = Date.now();
    const rental: Rental = {
      rentalId: `rental-${Date.now()}`,
      tokenId,
      collectionAddress,
      owner: address,
      renter,
      price,
      duration,
      startTime,
      endTime: startTime + (duration * 1000),
      active: true,
      timestamp: Date.now(),
    };
    
    setRentals([...rentals, rental]);
    return rental;
  };

  return { createRental, rentals, address };
}

