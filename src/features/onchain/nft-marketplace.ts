'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface MarketplaceListing {
  nftId: string;
  price: string;
  currency: string;
  seller: string;
  listed: boolean;
  wallet: string;
}

export function useNFTMarketplace() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [listings, setListings] = useState<MarketplaceListing[]>([]);

  const listNFT = async (nftId: string, price: string, currency: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `List NFT: ${nftId} for ${price} ${currency}`;
    await signMessageAsync({ message });
    
    const listing: MarketplaceListing = {
      nftId,
      price,
      currency,
      seller: address,
      listed: true,
      wallet: address,
    };
    
    setListings([...listings, listing]);
    return listing;
  };

  return { listNFT, listings, address };
}
