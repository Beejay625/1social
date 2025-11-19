'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentReaction {
  contentHash: string;
  reactionType: string;
  count: bigint;
  reactors: string[];
}

export function useOnchainContentReactionAggregator() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [reacting, setReacting] = useState(false);
  const [reactions, setReactions] = useState<ContentReaction[]>([]);

  const { data: reactionData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getReactions',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const addReaction = async (contentHash: string, reactionType: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setReacting(true);

    try {
      const message = `React to content onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'addReaction',
        args: [contentHash, reactionType, address],
      });
    } finally {
      setReacting(false);
    }
  };

  useEffect(() => {
    if (reactionData) {
      const reaction = reactionData as ContentReaction;
      setReactions(prev => {
        const filtered = prev.filter(r => r.contentHash !== reaction.contentHash || r.reactionType !== reaction.reactionType);
        return [...filtered, reaction];
      });
    }
  }, [reactionData]);

  return {
    addReaction,
    reacting,
    reactions,
    address,
    isConnected,
    reactionData,
  };
}

