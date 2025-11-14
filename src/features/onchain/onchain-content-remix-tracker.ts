'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface RemixData {
  originalContentHash: string;
  remixContentHash: string;
  remixer: string;
  attribution: string;
  timestamp: bigint;
}

export function useOnchainContentRemixTracker() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [tracking, setTracking] = useState(false);

