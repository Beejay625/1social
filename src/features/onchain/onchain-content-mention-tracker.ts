'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentMention {
  contentHash: string;
  mentionedAddress: string;
  mentioner: string;
  timestamp: bigint;
}

export function useOnchainContentMentionTracker() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [tracking, setTracking] = useState(false);
  const [mentions, setMentions] = useState<ContentMention[]>([]);

  const { data: mentionData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getMentions',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const mentionUser = async (contentHash: string, mentionedAddress: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setTracking(true);

    try {
      const message = `Mention user onchain: ${mentionedAddress}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'mentionUser',
        args: [contentHash, mentionedAddress, address],
      });
    } finally {
      setTracking(false);
    }
  };

  useEffect(() => {
    if (mentionData) {
      const mention = mentionData as ContentMention;
      setMentions(prev => {
        const filtered = prev.filter(m => m.contentHash !== mention.contentHash || m.mentionedAddress !== mention.mentionedAddress);
        return [...filtered, mention];
      });
    }
  }, [mentionData]);

  return {
    mentionUser,
    tracking,
    mentions,
    address,
    isConnected,
    mentionData,
  };
}

