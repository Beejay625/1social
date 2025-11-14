'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BoostConfig {
  contentHash: string;
  boostAmount: bigint;
  duration: number;
  targetProtocols: string[];
}

export function useOnchainContentEngagementBooster() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [boosting, setBoosting] = useState(false);

