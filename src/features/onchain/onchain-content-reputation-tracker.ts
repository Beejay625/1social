'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentReputation {
  contentHash: string;
  reputationScore: bigint;
  upvotes: bigint;
  downvotes: bigint;
  walletAddress: string;
  timestamp: bigint;
}

export function useOnchainContentReputationTracker() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [tracking, setTracking] = useState(false);
  const [reputations, setReputations] = useState<ContentReputation[]>([]);

  const { data: reputationData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getContentReputation',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const trackReputation = async (contentHash: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setTracking(true);

    try {
      const message = `Track onchain reputation for content: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'trackContentReputation',
        args: [contentHash, address],
      });
    } finally {
      setTracking(false);
    }
  };

  const upvoteContent = async (contentHash: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setTracking(true);

    try {
      const message = `Upvote content onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'upvoteContent',
        args: [contentHash, address],
      });
    } finally {
      setTracking(false);
    }
  };

  const downvoteContent = async (contentHash: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setTracking(true);

    try {
      const message = `Downvote content onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'downvoteContent',
        args: [contentHash, address],
      });
    } finally {
      setTracking(false);
    }
  };

