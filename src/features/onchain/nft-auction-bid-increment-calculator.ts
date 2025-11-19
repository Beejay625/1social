'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState } from 'react';

export interface BidIncrement {
  currentBid: bigint;
  nextMinBid: bigint;
  incrementAmount: bigint;
  incrementPercent: number;
}

export function useNFTAuctionBidIncrementCalculator() {
  const { address, isConnected } = useAccount();
  const [increment, setIncrement] = useState<BidIncrement | null>(null);

  const { data: currentBid } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getCurrentBid',
    args: ['0x', BigInt(0)],
  });

  const calculateIncrement = (currentBidAmount: bigint, incrementPercent: number = 5): BidIncrement => {
    if (!address || !isConnected) throw new Error('Wallet not connected');

    const incrementAmt = (currentBidAmount * BigInt(Math.floor(incrementPercent * 100))) / BigInt(10000);
    const nextBid = currentBidAmount + incrementAmt;

    const calc: BidIncrement = {
      currentBid: currentBidAmount,
      nextMinBid: nextBid,
      incrementAmount: incrementAmt,
      incrementPercent,
    };

    setIncrement(calc);
    return calc;
  };

  return {
    calculateIncrement,
    increment,
    address,
    isConnected,
    currentBid,
  };
}

