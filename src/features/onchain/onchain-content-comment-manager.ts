'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentComment {
  commentHash: string;
  contentHash: string;
  commenter: string;
  text: string;
  timestamp: bigint;
}

export function useOnchainContentCommentManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [commenting, setCommenting] = useState(false);
  const [comments, setComments] = useState<ContentComment[]>([]);

  const { data: commentData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getContentComments',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const addComment = async (contentHash: string, text: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setCommenting(true);

    try {
      const message = `Comment on content onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'addComment',
        args: [contentHash, text, address],
      });
    } finally {
      setCommenting(false);
    }
  };

  useEffect(() => {
    if (commentData) {
      const comment = commentData as ContentComment;
      setComments(prev => {
        const filtered = prev.filter(c => c.commentHash !== comment.commentHash);
        return [...filtered, comment];
      });
    }
  }, [commentData]);

  return {
    addComment,
    commenting,
    comments,
    address,
    isConnected,
    commentData,
  };
}

