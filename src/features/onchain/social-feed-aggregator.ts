'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface FeedPost {
  id: string;
  content: string;
  author: string;
  protocol: string;
  timestamp: number;
  engagement: number;
}

export function useSocialFeedAggregator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [feed, setFeed] = useState<FeedPost[]>([]);

  const aggregateFeed = async (protocols: string[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Aggregate Feed: ${protocols.join(', ')}`;
    await signMessageAsync({ message });
    
    const aggregatedPosts: FeedPost[] = protocols.map((protocol, index) => ({
      id: `feed-${Date.now()}-${index}`,
      content: `Post from ${protocol}`,
      author: address,
      protocol,
      timestamp: Date.now() + index,
      engagement: Math.floor(Math.random() * 100),
    }));
    
    setFeed([...feed, ...aggregatedPosts]);
    return aggregatedPosts;
  };

  return { aggregateFeed, feed, address };
}

