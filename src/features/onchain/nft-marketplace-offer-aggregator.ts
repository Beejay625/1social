'use client';

import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

export interface Offer {
  offerId: string;
  tokenId: string;
  collectionAddress: string;
  offerer: string;
  amount: string;
  expiresAt: number;
}

export interface AggregatedOffers {
  tokenId: string;
  collectionAddress: string;
  offers: Offer[];
  highestOffer: Offer | null;
  totalOffers: number;
}

export function useNFTMarketplaceOfferAggregator() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [aggregated, setAggregated] = useState<AggregatedOffers[]>([]);

  const aggregateOffers = async (tokenId: string, collectionAddress: string, offers: Offer[]) => {
    if (!address || !isConnected) throw new Error('Reown wallet not connected');
    
    const message = `Aggregate ${offers.length} offers for token ${tokenId}`;
    await signMessageAsync({ message });
    
    const highestOffer = offers.reduce((max, offer) => 
      parseFloat(offer.amount) > parseFloat(max?.amount || '0') ? offer : max, 
      null as Offer | null
    );
    
    const aggregated: AggregatedOffers = {
      tokenId,
      collectionAddress,
      offers,
      highestOffer,
      totalOffers: offers.length,
    };
    
    setAggregated([...aggregated, aggregated]);
    return aggregated;
  };

  return { 
    aggregateOffers, 
    aggregated, 
    address, 
    isConnected,
    hash,
    isPending,
    isConfirming,
    isConfirmed
  };
}

