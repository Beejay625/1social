'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ReputationListing {
  seller: string;
  reputationType: string;
  price: string;
  quantity: number;
  wallet: string;
}

export function useReputationMarketplace() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [listings, setListings] = useState<ReputationListing[]>([]);

  const listReputation = async (reputationType: string, price: string, quantity: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `List Reputation: ${reputationType} ${price} x${quantity}`;
    await signMessageAsync({ message });
    
    const listing: ReputationListing = {
      seller: address,
      reputationType,
      price,
      quantity,
      wallet: address,
    };
    
    setListings([...listings, listing]);
    return listing;
  };

  return { listReputation, listings, address };
}
