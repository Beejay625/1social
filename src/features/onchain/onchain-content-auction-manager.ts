'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface AuctionConfig {
  contentHash: string;
  startingPrice: bigint;
  reservePrice: bigint;
  duration: number;
  paymentToken: string;
}

export function useOnchainContentAuctionManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);

  const { data: auctionData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getAuction',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const createAuction = async (config: AuctionConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Create auction onchain: ${config.startingPrice} for content ${config.contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'createAuction',
        args: [
          config.contentHash,
          config.startingPrice,
          config.reservePrice,
          config.duration,
          config.paymentToken,
        ],
      });
    } finally {
      setManaging(false);
    }
  };

  const placeBid = async (contentHash: string, bidAmount: bigint) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Place bid onchain: ${bidAmount} for content ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'placeBid',
        args: [contentHash],
        value: bidAmount,
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
    auctionData,
  };
}

