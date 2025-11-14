'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export function useNFTMarketplaceOfferCancelerV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [canceling, setCanceling] = useState(false);

  const cancel = async (marketplaceAddress: string, offerId: bigint) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setCanceling(true);

    try {
      const message = `Cancel marketplace offer: ${offerId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: marketplaceAddress as `0x${string}`,
        abi: [],
        functionName: 'cancelOffer',
        args: [offerId],
      });
    } finally {
      setCanceling(false);
    }
  };

  return {
    cancel,
    canceling,
    address,
    isConnected,
  };
}
