'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SocialFollow {
  id: string;
  follower: string;
  following: string;
  protocol: string;
  timestamp: number;
  isActive: boolean;
}

export function useSocialFollowTracker() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [follows, setFollows] = useState<SocialFollow[]>([]);

  const followUser = async (targetAddress: string, protocol: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Follow: ${targetAddress} on ${protocol}`;
    await signMessageAsync({ message });
    
    const follow: SocialFollow = {
      id: `follow-${Date.now()}`,
      follower: address,
      following: targetAddress,
      protocol,
      timestamp: Date.now(),
      isActive: true,
    };
    
    setFollows([...follows, follow]);
    return follow;
  };

  const unfollowUser = async (targetAddress: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Unfollow: ${targetAddress}`;
    await signMessageAsync({ message });
    
    setFollows(follows.map(f => 
      f.following === targetAddress && f.follower === address 
        ? { ...f, isActive: false }
        : f
    ));
  };

  return { followUser, unfollowUser, follows, address };
}

