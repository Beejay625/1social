'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BidData {
  listingId: number;
  bidAmount: bigint;
  expiry?: number;
}

export function useNFTMarketplaceBidManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [bidding, setBidding] = useState(false);

  const { data: currentBid } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getBid',
    args: [BigInt(0), address],
  });

  const placeBid = async (marketplaceAddress: string, bid: BidData) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setBidding(true);

    try {
      const message = `Place bid ${bid.bidAmount} on listing ${bid.listingId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: marketplaceAddress as `0x${string}`,
        abi: [],
        functionName: 'placeBid',
        args: [bid.listingId, bid.bidAmount, bid.expiry || 0],
        value: bid.bidAmount,
      });
    } finally {
      setBidding(false);
    }
  };

  const withdrawBid = async (marketplaceAddress: string, listingId: number) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setBidding(true);

    try {
      await signMessageAsync({ message: `Withdraw bid from listing ${listingId}` });
      await writeContract({
        address: marketplaceAddress as `0x${string}`,
        abi: [],
        functionName: 'withdrawBid',
        args: [listingId],
      });
    } finally {
      setBidding(false);
    }
  };

  return {
    placeBid,
    withdrawBid,
    bidding,
    address,
    isConnected,
    currentBid,
  };
}

