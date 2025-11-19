'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface OfferManagement {
  marketplaceAddress: string;
  nftAddress: string;
  tokenId: bigint;
  offerPrice: bigint;
  expiry: number;
}

export function useNFTMarketplaceOfferManagerV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);

  const { data: activeOffers } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getActiveOffers',
    args: [address],
  });

  const createOffer = async (offer: OfferManagement) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Create offer: ${offer.offerPrice} for token ${offer.tokenId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: offer.marketplaceAddress as `0x${string}`,
        abi: [],
        functionName: 'makeOffer',
        args: [offer.nftAddress, offer.tokenId, offer.offerPrice, offer.expiry],
        value: offer.offerPrice,
      });
    } finally {
      setManaging(false);
    }
  };

  const cancelOffer = async (marketplaceAddress: string, offerId: number) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Cancel offer: ${offerId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: marketplaceAddress as `0x${string}`,
        abi: [],
        functionName: 'cancelOffer',
        args: [offerId],
      });
    } finally {
      setManaging(false);
    }
  };

  return {
    createOffer,
    cancelOffer,
    managing,
    address,
    isConnected,
    activeOffers,
  };
}

