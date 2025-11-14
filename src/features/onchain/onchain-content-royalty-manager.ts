'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RoyaltyConfig {
  contentHash: string;
  royaltyPercentage: number;
  recipients: string[];
  splitPercentages: number[];
}

export function useOnchainContentRoyaltyManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);

