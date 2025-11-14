'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TipDistribution {
  recipients: string[];
  amounts: bigint[];
  contentHash: string;
}

export function useOnchainTipDistributionOptimizer() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [optimizing, setOptimizing] = useState(false);

