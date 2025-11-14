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

