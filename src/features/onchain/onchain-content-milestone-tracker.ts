'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Milestone {
  contentHash: string;
  milestoneType: string;
  targetValue: bigint;
  reward: bigint;
  achieved: boolean;
}

export function useOnchainContentMilestoneTracker() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [tracking, setTracking] = useState(false);

