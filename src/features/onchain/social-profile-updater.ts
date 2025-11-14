'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SocialProfile {
  address: string;
  name: string;
  bio: string;
  avatar: string;
  protocol: string;
  updatedAt: number;
}

export function useSocialProfileUpdater() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [profiles, setProfiles] = useState<SocialProfile[]>([]);

  const updateProfile = async (name: string, bio: string, avatar: string, protocol: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Update Profile: ${name} on ${protocol}`;
    await signMessageAsync({ message });
    
    const profile: SocialProfile = {
      address,
      name,
      bio,
      avatar,
      protocol,
      updatedAt: Date.now(),
    };
    
    setProfiles([...profiles.filter(p => p.address !== address || p.protocol !== protocol), profile]);
    return profile;
  };

  return { updateProfile, profiles, address };
}


