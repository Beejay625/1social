'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SyndicationConfig {
  contentHash: string;
  targetProtocols: string[];
  syndicationFee: bigint;
  autoSyndicate: boolean;
}

export function useOnchainContentSyndicationManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [syndicating, setSyndicating] = useState(false);

