'use client';

/**
 * NFT Marketplace Offer Acceptor V3
 * Accept marketplace offers with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface OfferAcceptance {
  acceptanceId: string;
  offerId: string;
  collectionAddress: string;
  tokenId: string;
  offererAddress: string;
  price: string;
  acceptedBy: string;
  timestamp: number;
}

export function useNFTMarketplaceOfferAcceptorV3() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [acceptances, setAcceptances] = useState<OfferAcceptance[]>([]);

  const acceptOffer = async (
    offerId: string,
    collectionAddress: string,
    tokenId: string,
    offererAddress: string,
    price: string
  ): Promise<OfferAcceptance> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x') || !offererAddress.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    
    const message = `Accept offer V3: ${offerId} for ${collectionAddress} #${tokenId}`;
    await signMessageAsync({ message });
    
    const acceptance: OfferAcceptance = {
      acceptanceId: `accept-v3-${Date.now()}`,
      offerId,
      collectionAddress,
      tokenId,
      offererAddress,
      price,
      acceptedBy: address,
      timestamp: Date.now(),
    };
    
    setAcceptances([...acceptances, acceptance]);
    return acceptance;
  };

  return { acceptOffer, acceptances, address };
}

