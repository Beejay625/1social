'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState } from 'react';

export interface FeeCalculation {
  listingPrice: bigint;
  marketplaceFee: bigint;
  royaltyFee: bigint;
  creatorFee: bigint;
  netAmount: bigint;
  feeBreakdown: Array<{ name: string; amount: bigint; percentage: number }>;
}

export function useNFTMarketplaceFeeCalculator() {
  const { address, isConnected } = useAccount();
  const [calculation, setCalculation] = useState<FeeCalculation | null>(null);

  const { data: marketplaceFeeRate } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getFeeRate',
  });

  const calculateFees = async (listingPrice: bigint, royaltyPercentage: number = 2.5): Promise<FeeCalculation> => {
    if (!address || !isConnected) throw new Error('Wallet not connected');

    const feeRate = Number(marketplaceFeeRate) || 2.5;
    const marketplaceFee = (listingPrice * BigInt(Math.floor(feeRate * 100))) / BigInt(10000);
    const royaltyFee = (listingPrice * BigInt(Math.floor(royaltyPercentage * 100))) / BigInt(10000);
    const creatorFee = BigInt(0);
    const netAmount = listingPrice - marketplaceFee - royaltyFee - creatorFee;

    const calc: FeeCalculation = {
      listingPrice,
      marketplaceFee,
      royaltyFee,
      creatorFee,
      netAmount,
      feeBreakdown: [
        { name: 'Marketplace Fee', amount: marketplaceFee, percentage: feeRate },
        { name: 'Royalty Fee', amount: royaltyFee, percentage: royaltyPercentage },
        { name: 'Creator Fee', amount: creatorFee, percentage: 0 },
      ],
    };

    setCalculation(calc);
    return calc;
  };

  return {
    calculateFees,
    calculation,
    address,
    isConnected,
    marketplaceFeeRate,
  };
}
