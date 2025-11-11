'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SocialShare {
  id: string;
  postId: string;
  sharer: string;
  targetProtocol: string;
  timestamp: number;
  transactionHash?: string;
}

export function useSocialShareTracker() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [shares, setShares] = useState<SocialShare[]>([]);

  const sharePost = async (postId: string, targetProtocol: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Share: ${postId} to ${targetProtocol}`;
    await signMessageAsync({ message });
    
    const share: SocialShare = {
      id: `share-${Date.now()}`,
      postId,
      sharer: address,
      targetProtocol,
      timestamp: Date.now(),
      transactionHash: `0x${Date.now().toString(16)}`,
    };
    
    setShares([...shares, share]);
    return share;
  };

  return { sharePost, shares, address };
}

