'use client';

/**
 * NFT Marketplace Offer Acceptor V2
 * Accept marketplace offers with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface OfferAcceptance {
  acceptanceId: string;
  offerId: string;
  tokenId: string;
  collectionAddress: string;
  price: string;
  acceptedBy: string;
  txHash: string;
  timestamp: number;
}

export function useNFTMarketplaceOfferAcceptorV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [acceptances, setAcceptances] = useState<OfferAcceptance[]>([]);

  const acceptOffer = async (
    offerId: string,
    tokenId: string,
    collectionAddress: string,
    price: string
  ): Promise<OfferAcceptance> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (parseFloat(price) <= 0) {
      throw new Error('Price must be greater than zero');
    }
    
    const message = `Accept offer: ${offerId} for token ${tokenId}`;
    await signMessageAsync({ message });
    
    const acceptance: OfferAcceptance = {
      acceptanceId: `accept-${Date.now()}`,
      offerId,
      tokenId,
      collectionAddress,
      price,
      acceptedBy: address,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setAcceptances([...acceptances, acceptance]);
    return acceptance;
  };

  return { acceptOffer, acceptances, address };
}
