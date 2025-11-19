'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export function useNFTAuctionReservePriceManagerV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);

  const { data: reservePrice } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getReservePrice',
    args: ['0x', BigInt(0)],
  });

  const setReservePrice = async (auctionAddress: string, tokenId: bigint, price: bigint) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Set reserve price ${price} for token ${tokenId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: auctionAddress as `0x${string}`,
        abi: [],
        functionName: 'setReservePrice',
        args: [tokenId, price],
      });
    } finally {
      setManaging(false);
    }
  };

  return {
    setReservePrice,
    managing,
    address,
    isConnected,
    reservePrice,
  };
}

