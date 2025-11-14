'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface NFTRental {
  tokenId: string;
  renter: string;
  owner: string;
  price: string;
  duration: number;
  wallet: string;
}

export function useNFTRental() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [rentals, setRentals] = useState<NFTRental[]>([]);

  const rentNFT = async (tokenId: string, owner: string, price: string, duration: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Rent NFT: ${tokenId} from ${owner} ${price} ${duration} days`;
    await signMessageAsync({ message });
    
    const rental: NFTRental = {
      tokenId,
      renter: address,
      owner,
      price,
      duration,
      wallet: address,
    };
    
    setRentals([...rentals, rental]);
    return rental;
  };

  return { rentNFT, rentals, address };
}


