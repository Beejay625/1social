'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SubscriptionConfig {
  contentHash: string;
  subscriptionPrice: bigint;
  duration: number;
  autoRenew: boolean;
}

export function useOnchainContentSubscriptionManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);

