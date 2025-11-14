'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface OnchainAnalytics {
  id: string;
  contentId: string;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  tips: string;
  revenue: string;
  timestamp: number;
  updatedAt: number;
}

export function useSocialContentAnalyticsOnchain() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [analytics, setAnalytics] = useState<OnchainAnalytics[]>([]);

  const recordAnalytics = async (
    contentId: string,
    views: number,
    likes: number,
    shares: number,
    comments: number,
    tips: string,
    revenue: string
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Record Analytics: ${contentId} views:${views} likes:${likes}`;
    await signMessageAsync({ message });
    
    const onchainAnalytics: OnchainAnalytics = {
      id: `analytics-${Date.now()}`,
      contentId,
      views,
      likes,
      shares,
      comments,
      tips,
      revenue,
      timestamp: Date.now(),
      updatedAt: Date.now(),
    };
    
    setAnalytics([...analytics.filter(a => a.contentId !== contentId), onchainAnalytics]);
    return onchainAnalytics;
  };

  return { recordAnalytics, analytics, address };
}


