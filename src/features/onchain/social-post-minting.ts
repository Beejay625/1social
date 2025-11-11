'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SocialPost {
  id: string;
  content: string;
  author: string;
  protocol: string;
  timestamp: number;
  nftTokenId?: string;
}

export function useSocialPostMinting() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [posts, setPosts] = useState<SocialPost[]>([]);

  const mintPost = async (content: string, protocol: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Mint Post: ${protocol} - ${content.substring(0, 50)}`;
    await signMessageAsync({ message });
    
    const post: SocialPost = {
      id: `post-${Date.now()}`,
      content,
      author: address,
      protocol,
      timestamp: Date.now(),
      nftTokenId: `nft-${Date.now()}`,
    };
    
    setPosts([...posts, post]);
    return post;
  };

  return { mintPost, posts, address };
}

