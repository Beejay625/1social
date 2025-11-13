'use client';

/**
 * NFT Marketplace Offer Manager V2
 * Manage marketplace offers with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Offer {
  offerId: string;
  tokenId: string;
  collectionAddress: string;
  price: string;
  currency: string;
  offerer: string;
  expiresAt: number;
  active: boolean;
  timestamp: number;
}

export function useNFTMarketplaceOfferManagerV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [offers, setOffers] = useState<Offer[]>([]);

  const createOffer = async (
    tokenId: string,
    collectionAddress: string,
    price: string,
    currency: string,
    expiresAt: number
  ): Promise<Offer> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (expiresAt <= Date.now()) {
      throw new Error('Expiration time must be in the future');
    }
    
    const message = `Create offer: ${collectionAddress} #${tokenId} ${price} ${currency}`;
    await signMessageAsync({ message });
    
    const offer: Offer = {
      offerId: `offer-${Date.now()}`,
      tokenId,
      collectionAddress,
      price,
      currency,
      offerer: address,
      expiresAt,
      active: true,
      timestamp: Date.now(),
    };
    
    setOffers([...offers, offer]);
    return offer;
  };

  return { createOffer, offers, address };
}

