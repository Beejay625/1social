'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface NFTListing {
  tokenId: string;
  price: string;
  currency: string;
  seller: string;
}

export function useNFTMarketplace() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [listings, setListings] = useState<NFTListing[]>([]);

  const listNFT = async (tokenId: string, price: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `List NFT: ${tokenId} for ${price}`;
    await signMessageAsync({ message });
    
    const listing: NFTListing = {
      tokenId,
      price,
      currency: 'ETH',
      seller: address,
    };
    
    setListings([...listings, listing]);
    return listing;
  };

  return { listNFT, listings, address };
}

