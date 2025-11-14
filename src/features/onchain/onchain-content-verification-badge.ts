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

  const { data: badgeData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getVerificationBadge',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const issueBadge = async (badge: VerificationBadge) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setVerifying(true);

    try {
      const message = `Issue verification badge onchain: ${badge.badgeType} for ${badge.contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'issueVerificationBadge',
        args: [
          badge.contentHash,
          badge.badgeType,
          badge.issuer,
          badge.expiryTime,
          badge.metadata,
        ],
      });
    } finally {
      setVerifying(false);
    }
  };

  return {
    issueBadge,
    verifying,
    address,
    isConnected,
    badgeData,
  };
}

