'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RevenueSplit {
  contentHash: string;
  collaborators: string[];
  splitPercentages: number[];
  totalRevenue: bigint;
}

export function useOnchainCollaborationRevenueSplitter() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [splitting, setSplitting] = useState(false);

