'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SocialComment {
  id: string;
  postId: string;
  content: string;
  author: string;
  timestamp: number;
  transactionHash?: string;
}

export function useSocialCommentMinting() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [comments, setComments] = useState<SocialComment[]>([]);

  const mintComment = async (postId: string, content: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Mint Comment: ${postId} - ${content.substring(0, 50)}`;
    await signMessageAsync({ message });
    
    const comment: SocialComment = {
      id: `comment-${Date.now()}`,
      postId,
      content,
      author: address,
      timestamp: Date.now(),
      transactionHash: `0x${Date.now().toString(16)}`,
    };
    
    setComments([...comments, comment]);
    return comment;
  };

  return { mintComment, comments, address };
}

