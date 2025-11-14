'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SocialReaction {
  id: string;
  postId: string;
  type: 'like' | 'love' | 'tip' | 'collect';
  author: string;
  amount?: string;
  timestamp: number;
}

export function useSocialReactionTracker() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [reactions, setReactions] = useState<SocialReaction[]>([]);

  const addReaction = async (postId: string, type: 'like' | 'love' | 'tip' | 'collect', amount?: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `React: ${type} on ${postId}${amount ? ` - ${amount}` : ''}`;
    await signMessageAsync({ message });
    
    const reaction: SocialReaction = {
      id: `reaction-${Date.now()}`,
      postId,
      type,
      author: address,
      amount,
      timestamp: Date.now(),
    };
    
    setReactions([...reactions, reaction]);
    return reaction;
  };

  return { addReaction, reactions, address };
}


