'use client';

/**
 * NFT Rental Manager V3
 * Advanced NFT rental management with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface Rental {
  rentalId: string;
  tokenId: string;
  collectionAddress: string;
  renter: string;
  duration: number;
  price: string;
  status: 'active' | 'completed' | 'cancelled';
  createdBy: string;
  timestamp: number;
}

export function useNFTRentalManagerV3() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [rentals, setRentals] = useState<Rental[]>([]);

  const createRental = async (
    tokenId: string,
    collectionAddress: string,
    renter: string,
    duration: number,
    price: string
  ): Promise<Rental> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x') || !renter.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    
    const message = `Create rental: ${tokenId} in ${collectionAddress} to ${renter} for ${duration} days at ${price}`;
    await signMessageAsync({ message });
    
    const rental: Rental = {
      rentalId: `rental-${Date.now()}`,
      tokenId,
      collectionAddress,
      renter,
      duration,
      price,
      status: 'active',
      createdBy: address,
      timestamp: Date.now(),
    };
    
    setRentals([...rentals, rental]);
    return rental;
  };

  const completeRental = async (rentalId: string): Promise<void> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Complete rental ${rentalId}`;
    await signMessageAsync({ message });
    
    setRentals(rentals.map(r => 
      r.rentalId === rentalId ? { ...r, status: 'completed' } : r
    ));
  };

  return { createRental, completeRental, rentals, address };
}

