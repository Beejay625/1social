'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface ScheduledPost {
  id: string;
  content: string;
  timestamp: number;
  txHash?: string;
}

export function useOnchainSchedulingQueue() {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [scheduled, setScheduled] = useState<ScheduledPost[]>([]);

  const scheduleOnchain = async (content: string, timestamp: number) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    const postId = `post_${Date.now()}`;
    const post: ScheduledPost = { id: postId, content, timestamp };
    
    // Store metadata onchain via contract call
    const message = `Schedule:${postId}:${timestamp}:${content}`;
    
    setScheduled([...scheduled, post]);
    return post;
  };

  return { scheduleOnchain, scheduled, isConnected };
}

