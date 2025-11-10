'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface MarketplaceListing {
  tokenId: string;
  price: string;
  marketplace: string;
  listed: boolean;
}

export function useNFTMarketplaceIntegration() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [listings, setListings] = useState<MarketplaceListing[]>([]);

  const listNFT = async (tokenId: string, price: string, marketplace: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `List: ${tokenId} ${price} on ${marketplace}`;
    await signMessageAsync({ message });
    
    const listing: MarketplaceListing = {
      tokenId,
      price,
      marketplace,
      listed: true,
    };
    
    setListings([...listings, listing]);
    return listing;
  };

  return { listNFT, listings, address };
}
