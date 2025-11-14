'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface VerificationBadge {
  contentHash: string;
  badgeType: string;
  issuer: string;
  expiryTime: bigint;
  metadata: string;
}

export function useOnchainContentVerificationBadge() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [verifying, setVerifying] = useState(false);

