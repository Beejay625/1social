'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface AuctionConfig {
  tokenId: bigint;
  reservePrice: bigint;
  duration: number;
}

export function useNFTAuctionManagerV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);

  const createAuction = async (auctionAddress: string, config: AuctionConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Create auction for token ${config.tokenId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: auctionAddress as `0x${string}`,
        abi: [],
        functionName: 'createAuction',
        args: [config.tokenId, config.reservePrice, config.duration],
      });
    } finally {
      setManaging(false);
    }
  };

  const placeBid = async (auctionAddress: string, auctionId: bigint, amount: bigint) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Place bid on auction ${auctionId}: ${amount}`;
      await signMessageAsync({ message });

      await writeContract({
        address: auctionAddress as `0x${string}`,
        abi: [],
        functionName: 'placeBid',
        args: [auctionId],
        value: amount,
      });
    } finally {
      setManaging(false);
    }
  };

  return {
    createAuction,
    placeBid,
    managing,
    address,
    isConnected,
  };
}

