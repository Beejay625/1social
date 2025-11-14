'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface VerificationBadge {
  id: string;
  address: string;
  badgeType: 'verified' | 'creator' | 'influencer' | 'brand';
  issuer: string;
  timestamp: number;
  valid: boolean;
}

export function useSocialVerificationBadge() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [badges, setBadges] = useState<VerificationBadge[]>([]);

  const issueBadge = async (targetAddress: string, badgeType: 'verified' | 'creator' | 'influencer' | 'brand') => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Issue Badge: ${badgeType} to ${targetAddress}`;
    await signMessageAsync({ message });
    
    const badge: VerificationBadge = {
      id: `badge-${Date.now()}`,
      address: targetAddress,
      badgeType,
      issuer: address,
      timestamp: Date.now(),
      valid: true,
    };
    
    setBadges([...badges, badge]);
    return badge;
  };

  return { issueBadge, badges, address };
}


