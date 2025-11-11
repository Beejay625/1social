'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface EngagementReward {
  id: string;
  recipient: string;
  amount: string;
  engagementType: 'like' | 'comment' | 'share' | 'tip';
  postId: string;
  timestamp: number;
}

export function useSocialEngagementRewards() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [rewards, setRewards] = useState<EngagementReward[]>([]);

  const rewardEngagement = async (recipient: string, amount: string, engagementType: 'like' | 'comment' | 'share' | 'tip', postId: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Reward Engagement: ${engagementType} on ${postId} - ${amount}`;
    await signMessageAsync({ message });
    
    const reward: EngagementReward = {
      id: `reward-${Date.now()}`,
      recipient,
      amount,
      engagementType,
      postId,
      timestamp: Date.now(),
    };
    
    setRewards([...rewards, reward]);
    return reward;
  };

  return { rewardEngagement, rewards, address };
}

