'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface AuctionConfig {
  nftAddress: string;
  tokenId: bigint;
  reservePrice: bigint;
  startPrice: bigint;
  duration: number;
  auctionType: 'english' | 'dutch';
}

export function useNFTAuctionManagerV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [creating, setCreating] = useState(false);
  const [bidding, setBidding] = useState(false);

  const { data: currentBid } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getCurrentBid',
    args: ['0x', BigInt(0)],
  });

  const createAuction = async (config: AuctionConfig) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setCreating(true);

    try {
      const message = `Create auction for NFT ${config.tokenId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: config.nftAddress as `0x${string}`,
        abi: [],
        functionName: 'createAuction',
        args: [config.tokenId, config.reservePrice, config.startPrice, config.duration],
      });
    } finally {
      setCreating(false);
    }
  };

  const placeBid = async (nftAddress: string, tokenId: bigint, bidAmount: bigint) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setBidding(true);

    try {
      const message = `Place bid ${bidAmount} on NFT ${tokenId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: nftAddress as `0x${string}`,
        abi: [],
        functionName: 'placeBid',
        args: [tokenId, bidAmount],
        value: bidAmount,
      });
    } finally {
      setBidding(false);
    }
  };

  return {
    createAuction,
    placeBid,
    creating,
    bidding,
    address,
    isConnected,
    currentBid,
  };
}

