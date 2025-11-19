'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentEmbed {
  contentHash: string;
  embedUrl: string;
  embedCount: bigint;
  timestamp: bigint;
}

export function useOnchainContentEmbedTracker() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [tracking, setTracking] = useState(false);
  const [embeds, setEmbeds] = useState<ContentEmbed[]>([]);

  const { data: embedData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getContentEmbeds',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const trackEmbed = async (contentHash: string, embedUrl: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setTracking(true);

    try {
      const message = `Track embed onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'trackEmbed',
        args: [contentHash, embedUrl, address],
      });
    } finally {
      setTracking(false);
    }
  };

  useEffect(() => {
    if (embedData) {
      const embed = embedData as ContentEmbed;
      setEmbeds(prev => {
        const filtered = prev.filter(e => e.contentHash !== embed.contentHash);
        return [...filtered, embed];
      });
    }
  }, [embedData]);

  return {
    trackEmbed,
    tracking,
    embeds,
    address,
    isConnected,
    embedData,
  };
}

