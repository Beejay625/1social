'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentTag {
  contentHash: string;
  tag: string;
  tagger: string;
  timestamp: bigint;
}

export function useOnchainContentTagManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [tagging, setTagging] = useState(false);
  const [tags, setTags] = useState<ContentTag[]>([]);

  const { data: tagData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getContentTags',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const tagContent = async (contentHash: string, tag: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setTagging(true);

    try {
      const message = `Tag content onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'tagContent',
        args: [contentHash, tag, address],
      });
    } finally {
      setTagging(false);
    }
  };

  useEffect(() => {
    if (tagData) {
      const tag = tagData as ContentTag;
      setTags(prev => {
        const filtered = prev.filter(t => t.contentHash !== tag.contentHash || t.tag !== tag.tag);
        return [...filtered, tag];
      });
    }
  }, [tagData]);

  return {
    tagContent,
    tagging,
    tags,
    address,
    isConnected,
    tagData,
  };
}

