'use client';

/**
 * NFT Marketplace Offer Canceler
 * Cancel marketplace offers with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface OfferCancellation {
  cancellationId: string;
  offerId: string;
  canceledBy: string;
  timestamp: number;
}

export function useNFTMarketplaceOfferCanceler() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [cancellations, setCancellations] = useState<OfferCancellation[]>([]);

  const cancelOffer = async (
    offerId: string
  ): Promise<OfferCancellation> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Cancel offer: ${offerId}`;
    await signMessageAsync({ message });
    
    const cancellation: OfferCancellation = {
      cancellationId: `cancel-${Date.now()}`,
      offerId,
      canceledBy: address,
      timestamp: Date.now(),
    };
    
    setCancellations([...cancellations, cancellation]);
    return cancellation;
  };

  return { cancelOffer, cancellations, address };
}
